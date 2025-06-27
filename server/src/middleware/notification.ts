import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';

// Model
import Notification from '../models/Notification';

declare global {
    namespace Express {
        interface Request {
            notification: Notification
        }
    }
}

export const validateNotificationId = async (req: Request, res: Response, next: NextFunction) => {
    await param("notificationId")
        .isInt().withMessage("Id no válido")
        .custom(value => value > 0).withMessage("Id no válido")
        .run(req);

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return;
    } else {
        next()
    }
}

export const validateIfNotificationExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByPk(notificationId)

        if (!notification) {
            const error = new Error("Notificación no encontrada");
            res.status(404).json({ error: error.message });
            return;
        }
        req.notification = notification;

        next()
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" })
    }
}