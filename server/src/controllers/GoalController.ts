import { Request, Response } from "express";

// Model
import Goal from "../models/Goal";

export class GoalController {
    // Add new goal
    static new = async (req: Request, res: Response) => {
        const { title } = req.body;

        // Check if goal was already added
        const existingGoal = await Goal.findOne({ where:{ title } })
        if (existingGoal) {
            const error = new Error("Ya añadiste esta meta.");
            res.status(409).json({ error: error.message });
            return;
        }

        try {
            // Create new goal
            const goal = new Goal(req.body)

            // Save changes
            goal.userId = req.user.id
            await goal.save()

            res.status(201).json(`Meta añadida con éxito: ${title}`)
        } catch (error) {
            res.status(500).json({ error: "Error adding the goal" })
            // console.log(error)
        }
    }
}