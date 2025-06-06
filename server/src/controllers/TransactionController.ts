import { Request, Response } from "express";

// Model
import Transaction from "../models/Transaction";

export class TransactionController {
    // Get a list with all the transactions registered
    static getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            
            // Get call transactions
            const transactions = await Transaction.findAll({ where: { userId } })

            // Send transactions
            res.json(transactions)
        } catch (error) {
            res.status(500).json({ error: "Error getting all the transactions" })
        }
    }

    // Register a transaction - financial movement
    static new = async (req: Request, res: Response) => {
        try {
            const transaction = new Transaction(req.body)

            // Send the user id & save
            transaction.userId = req.user.id
            await transaction.save()

            res.status(201).json("Registro de movimiento añadido con éxito")

        } catch (error) {
            res.status(500).json({ error: "Error adding the transaction" })
            console.log(error)
        }
    }

    // Get a transaction with it's id
    static getById = async (req: Request, res: Response) => {
        res.json(req.transaction);
    }

    // Update transaction with it's id
    static updateById = async (req: Request, res: Response) => {
        // Update changes
        await req.transaction.update(req.body);

        res.json("Registro de movimiento actualizado con éxito.");
    }

    // Delete transaction with it's id
    static deleteById = async (req: Request, res: Response) => {
        // Delete
        await req.transaction.destroy()

        res.json("Registro de movimiento eliminado con éxito.");
    }

    // Search transaction by name
    static search = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            const transactionQuery = req.query.name;
            // console.log(transactionQuery)

            const categories = await Transaction.findAll({
                where: {
                    userId: userId,
                }
            });

            const searchResult = categories.filter(transaction =>
                transaction.title.toLowerCase().includes((transactionQuery as string).trim())
            );

            if (!searchResult  || searchResult.length === 0) {
                const error = new Error(`El movimiento "${transactionQuery}}" no existe.`);
                res.status(409).json({ error: error.message });
                return;
            }

            // Return categories list
            res.json(searchResult)
        } catch (error) {
            res.status(500).json({ error: "Error al buscar movimiento." })
        }
    }
}