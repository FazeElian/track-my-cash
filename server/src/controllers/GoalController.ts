import { Request, Response } from "express";
import { Sequelize } from "sequelize";

// Model
import Goal from "../models/Goal";

// Utils
import { getNowDateOnly } from "../utils/date";
import Notification from "../models/Notification";

export class GoalController {
    // Get all the goals
    static getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            
            // Get all goals
            const goals = await Goal.findAll({
                where: { userId },
                order: [
                    [Sequelize.literal(
                        `CASE 
                            WHEN state = 'InProgress' THEN 0
                            WHEN state = 'Expired' THEN 1
                            WHEN state = 'Completed' THEN 2
                            ELSE 3
                            END`
                        ), "ASC"
                    ],
                    ["priorityLevel", "DESC"],
                    ["deadline", "DESC"]
                ]
            });

            // Check if any goal is expired
            const now = getNowDateOnly();
            goals.forEach(async (goal: Goal) => {
                const deadline = new Date(goal.deadline);
                // console.log("Now:", now)
                // console.log("Deadline", deadline)
                if (goal.currentAmount === goal.targetAmount) {
                    goal.state = "Completed"; // Change status
                }
                
                if (deadline <= now) {
                    goal.state = "Expired"; // Change status

                    const notification = await Notification.findOne({
                        where: {
                            description: `La meta "${goal.title}" ha vencido sin ser alcanzada. Puedes reactivarla e intentarlo de nuevo. ¡Tú puedes!`,
                            read: false
                        }
                    });

                    // Create new notificaion
                    if (!notification) {
                        await Notification.create({
                            userId: req.user.id,
                            title: "Meta vencida ⏳",
                            type: "GoalExpired",
                            description: `La meta "${goal.title}" ha vencido sin ser alcanzada. Puedes reactivarla e intentarlo de nuevo. ¡Tú puedes!`,
                            read: false
                        });
                    }

                    goal.save();
                } else if (deadline > now) {
                    if (goal.state !== "Completed") {
                        if (goal.currentAmount === goal.targetAmount) {
                            goal.state = "Completed"; // Change status
                        }
                        goal.state = "InProgress"; // Change status
                        goal.save()
                    }
                }
            });

            // Send goals
            res.json(goals)
        } catch (error) {
            res.status(500).json({ error: "Error getting all the goals" })
            console.log(error)
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

    // Update goal with it's id
    static updateById = async (req: Request, res: Response) => {
        // Update changes
        await req.goal.update(req.body);

        res.json("Meta actualizada con éxito.");
    }

    // Re activate goal
    static reActivateGoal = async (req: Request, res: Response) => {
        try {
            // Get goal id
            const goalId = req.goal.id;

            // Get goal
            const goal = await Goal.findByPk(goalId);
            
            // Check if the goal status is not expired
            if(goal.state !== "Expired") {
                const error = new Error("Esta meta está activada o completada.");
                res.status(409).json({ error: error.message });
                return;
            }

            // Change deadline
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            tomorrow.setDate(tomorrow.getDate() + 1);

            goal.deadline = String(tomorrow)
            goal.state = "InProgress";

            // Save changes
            goal.save()

            res.status(201).json(`Meta reactivada: ${goal.title}`)
        } catch (error) {
            res.status(500).json({ error: "Error reactivating the goal" })
        }
    }

    // Delete goal with it's id
    static deleteById = async (req: Request, res: Response) => {
        // Delete
        await req.goal.destroy()

        res.json("Meta eliminada con éxito.");
    }

    // Search goal by title
    static search = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            const goalQuery = req.query.title;
            // console.log(goalQuery)

            const goals = await Goal.findAll({
                where: {
                    userId: userId,
                }
            });

            const searchResult = goals.filter(goal =>
                goal.title.toLowerCase().includes((goalQuery as string).trim())
            );

            if (!searchResult  || searchResult.length === 0) {
                const error = new Error(`La meta "${goalQuery}}" no existe.`);
                res.status(409).json({ error: error.message });
                return;
            }

            // Return goals list
            res.json(searchResult)
        } catch (error) {
            res.status(500).json({ error: "Error al buscar meta." })
        }
    }
}