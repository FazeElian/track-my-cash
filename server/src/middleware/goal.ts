import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

// Model
import Goal from '../models/Goal';

declare global {
    namespace Express {
        interface Request {
            goal: Goal
        }
    }
}

export const validateGoalId = async (req: Request, res: Response, next: NextFunction) => {
    await param("goalId")
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

export const validateIfGoalExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal.findByPk(goalId)

        if (!goal) {
            const error = new Error("Meta no encontrada");
            res.status(404).json({ error: error.message });
            return;
        }
        req.goal = goal;

        next()
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" })
    }
}

export const validateGoalInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("title")
        .notEmpty().withMessage("El nombre de la meta es un dato obligatorio.")
        .isLength({ min: 5 }).withMessage("El nombre de la meta debe tener al menos 5 caracteres.")
        .isLength({ max: 70 }).withMessage("El nombre de la meta no puede superar los 70 caracteres.")
        .run(req),
    await body("targetAmount")
        .notEmpty().withMessage("La cantidad objetivo de la meta es un dato obligatorio")
        .isLength({ min: 1 }).withMessage("Cantidad objetivo no válida")
        .isFloat({ gt: 0 }).withMessage("La cantidad objetivo debe ser un número mayor que cero.")
        .isInt().withMessage("Cantidad objetivo no válida")
        .run(req),
    await body("deadline")
        .notEmpty().withMessage("La fecha límite para la meta es un dato obligatorio")
        .isString().withMessage("Fecha límite no válida")
        .run(req),
    await body("priorityLevel")
        .notEmpty().withMessage("El nivel de prioridad de la meta es un dato obligatorio")
        .isString().withMessage("Nivel de prioridad no válido")
        .run(req),
    await body("category")
        .notEmpty().withMessage("La categoría de la meta es un dato obligatorio")
        .isString().withMessage("Categoría de meta no válida")
        .run(req),
    next()
}

export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
    if(req.transaction.userId !== req.user.id) {
        const error = new Error("Acción no válida");
        return res.status(401).json({ error: error.message });
    }    

    next();
}