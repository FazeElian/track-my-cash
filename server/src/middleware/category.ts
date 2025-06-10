import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

// Model
import Category from '../models/Category';

declare global {
    namespace Express {
        interface Request {
            category: Category
        }
    }
}

export const validateCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    await param("categoryId")
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

export const validateIfCategoryExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findByPk(categoryId)

        if (!category) {
            const error = new Error("Categoría no encontrada");
            res.status(404).json({ error: error.message });
            return;
        }
        req.category = category;

        next()
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error" })
    }
}

export const validateCategoryInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name")
        .notEmpty().withMessage("El nombre de la categoría es un dato obligatorio.")
        .isLength({ min: 4 }).withMessage("El nombre de la categoría debe tener al menos 4 caracteres.")
        .run(req),
    await body("type")
        .isString().withMessage("Tipo de categoría no válido")
        .notEmpty().withMessage("El tipo de categoría es un dato obligatorio")
        .run(req),
    await body("icon")
        .isString().withMessage("Icono de categoría no válido")
        .run(req),
    await body("color")
        .isString().withMessage("Color de categoría no válido")
        .run(req)
    next()
}

export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
    if(req.category.userId !== req.user.id) {
        const error = new Error("Acción no válida");
        return res.status(401).json({ error: error.message });
    }    

    next();
}