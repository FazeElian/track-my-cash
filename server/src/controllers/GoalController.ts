import { Request, Response } from "express";

// Model
import Goal from "../models/Goal";

export class GoalController {
    // Get all the goals
    static getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            
            // Get all goals
            const goals = await Goal.findAll({
                where: { userId },
                order: [
                    ["priorityLevel", "DESC"],
                    ["deadline", "DESC"]
                ]
            });

            // Send goals
            res.json(goals)
        } catch (error) {
            res.status(500).json({ error: "Error getting all the goals" })
        }
    }

    // Get goal by its id
    static getById = async (req: Request, res: Response) => {
        res.json(req.goal);
    }

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
            console.log(error)
        }
    }

    // Delete goal with it's id
    static deleteById = async (req: Request, res: Response) => {
        // Delete
        await req.goal.destroy()

        res.json("Meta eliminada con éxito.");
    }
}