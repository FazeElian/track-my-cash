import { Request, Response } from "express";

// Model
import Category from "../models/Category";

export class CategoryController {
    // Get a list with all the categories created
    static getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            
            // Get call categories
            const categories = await Category.findAll({ where: { userId } })

            // Send categories
            res.json(categories)
        } catch (error) {
            res.status(500).json({ error: "Error getting all the categories" })
        }
    }

    // Create a category
    static new = async (req: Request, res: Response) => {
        const { name } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ where: { name } })
        if (existingCategory) {
            const error = new Error("Esta categoría ya existe.");
            res.status(409).json({ error: error.message });
            return;
        }

        try {
            // Create new category
            const category = new Category(req.body)

            // Send the user id & save
            category.userId = req.user.id
            await category.save()

            res.status(201).json(`Categoría creada con éxito: ${category.name}`)
        } catch (error) {
            res.status(500).json({ error: "Error creating the category" })
        }
    }

    // Get a category with it's id
    static getById = async (req: Request, res: Response) => {
        res.json(req.category);
    }

    // Update category with it's id
    static updateById = async (req: Request, res: Response) => {
        // Update changes
        await req.category.update(req.body);

        res.json("Categoría actualizada con éxito.");
    }

    // Delete category with it's id
    static deleteById = async (req: Request, res: Response) => {
        // Delete
        await req.category.destroy()

        res.json("Categoría eliminada con éxito.");
    }
}