import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

// Model
import Transaction from '../models/Transaction';

declare global {
    namespace Express {
        interface Request {
            transaction: Transaction
        }
    }
}

export const validateTransactionId = async (req: Request, res: Response, next: NextFunction) => {
    await param("transactionId")
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

export const validateIfTransactionExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findByPk(transactionId)

        if (!transaction) {
            const error = new Error("Categoría no encontrada");
            res.status(404).json({ error: error.message });
            return;
        }
        req.transaction = transaction;

        next()
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" })
    }
}

export const validateTransactionInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("title")
        .notEmpty().withMessage("El nombre del movimiento es un dato obligatorio.")
        .isLength({ min: 5 }).withMessage("El nombre del movimiento debe tener al menos 5 caracteres.")
        .run(req),
    await body("amount")
        .notEmpty().withMessage("El monto del movimiento es un dato obligatorio")
        .isLength({ min: 1 }).withMessage("Monto no válido")
        .isFloat({ gt: 0 }).withMessage("El monto debe ser un número mayor que cero.")
        .isInt().withMessage("Monto no válido")
        .run(req),
    await body("type")
        .notEmpty().withMessage("El tipo de movimiento es un dato obligatorio")
        .isString().withMessage("Tipo de movimiento no válido")
        .run(req),
    await body("date")
        .notEmpty().withMessage("La Fecha del movimiento es un dato obligatorio")
        .isString().withMessage("Fecha del movimiento no válida")
        .run(req),
    await body("notes")
        .isString().withMessage("La nota debe ser un texto")
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