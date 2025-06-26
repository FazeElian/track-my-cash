import { Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";

// Model
import Notification from "../models/Notification";

export class NotificationController {
    static getAll = async (req: Request, res: Response) =>  {
        try {
            const userId = req.user.id;
            
            // Get all notifications
            const notifications = await Notification.findAll({
                where: { userId },
                order: [
                    [Sequelize.literal(
                        `CASE 
                            WHEN read = false THEN 0
                            WHEN read = true THEN 1
                            ELSE 2
                            END`
                        ), "ASC"
                    ],
                    ["createdAt", "DESC"],
                ]
            });

            // Send notifications
            res.json(notifications)
        } catch (error) {
            res.status(500).json({ error: "Error getting all the notifications" })
        }
    }
}