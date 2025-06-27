import { Request, Response } from "express";

// Models
import Transaction from "../models/Transaction";
import Goal from "../models/Goal";
import Notification from "../models/Notification";

export class TransactionController {
    // Get a list with all the transactions registered
    static getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            
            // Get call transactions
            const transactions = await Transaction.findAll({
                where: { userId },
                order: [
                    ["date", "DESC"]
                ]
            })

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

            // If the transaction type is not an income
            if (transaction.type !== "Income" && transaction.goalId) {
                const error = new Error("Para asociar una meta al movimiento, deber ser un ingreso.");
                res.status(409).json({ error: error.message });
                return;
            }

            // If the transaction is not completed
            if (transaction.state !== "Completed" && transaction.goalId) {
                const error = new Error("Para asociar una meta al movimiento, el movimiento debe haberse completado.");
                res.status(409).json({ error: error.message });
                return;
            }

            // Transaction doesn't include a goal
            if (!transaction.goalId) {
                transaction.goalId === null
            }

            // If the transaction is associated with a goal
            const goalId = transaction.goalId; // Get goal id from transaction
            if (goalId) {
                const goal = await Goal.findOne({ where: { id: goalId } });
                if (goal) {
                    goal.currentAmount += transaction.amount;

                    if (goal.currentAmount >= goal.targetAmount) {
                        // Mark goal as completed
                        goal.state = "Completed";
                        goal.currentAmount = goal.targetAmount; // Make it with the same value for %
                        
                        // Create new notificaion
                        await Notification.create({
                            userId: req.user.id,
                            title: "¡Meta completada! 🎉",
                            type: "Goal",
                            description: `Has alcanzado tu meta "${goal.title}". ¡Excelente trabajo!`,
                            read: false
                        })
                    }
                    await goal.save();
                }
            }

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
        // Get transaction
        const oldTransaction = req.transaction;
        const newTransaction = req.body;

        // If the new transaction type is not an income
        if (newTransaction.type !== "Income" && newTransaction.goalId) {
            const error = new Error("Para asociar una meta al movimiento, deber ser un ingreso.");
            res.status(409).json({ error: error.message });
            return;
        }

        // If the new transaction is not completed
        if (newTransaction.state !== "Completed" && newTransaction.goalId) {
            const error = new Error("Para asociar una meta al movimiento, el movimiento debe haberse completado.");
            res.status(409).json({ error: error.message });
            return;
        }

        // If there's no goal associated on the new transaction
        if (oldTransaction.goalId && !newTransaction.goalId) {
            const oldGoal = await Goal.findOne({ where: { id: oldTransaction.goalId } });
            if (oldGoal) {
                oldGoal.currentAmount -= oldTransaction.amount;
                if (oldGoal.currentAmount < 0) oldGoal.currentAmount = 0;

                // Actualizar estado
                if (oldGoal.currentAmount < oldGoal.targetAmount) {
                    oldGoal.state = "InProgress";
                }

                await oldGoal.save();
            }
        }

        // If the transaction is associated with a goal
        if (newTransaction.goalId) {
            // If the user change the value of the amount but is NOT the same goal
            if (newTransaction.goalId !== oldTransaction.goalId) {
                // substract with the previous goal (if existed)
                if (oldTransaction.goalId) {
                    const oldGoal = await Goal.findOne({ where: { id: oldTransaction.goalId } });
                    if (oldGoal) {
                        oldGoal.currentAmount -= oldTransaction.amount;

                        // Mark as InProgress if the current amount is lower than the target amount
                        if (oldGoal.currentAmount >= oldGoal.targetAmount) {
                            oldGoal.state = "InProgress";
                        }
                    }
                    await oldGoal.save();
                }

                // Sum to the new goal (if it's asocciated)
                if (newTransaction.goalId) {
                    const newGoal = await Goal.findOne({ where: { id: newTransaction.goalId } });
                    if (newGoal) {
                        newGoal.currentAmount += newTransaction.amount;

                        // Mark as completed if the current amount is equal or higher than the target amount
                        if (newGoal.currentAmount >= newGoal.targetAmount) {
                            // Mark goal as completed
                            newGoal.state = "Completed";
                            newGoal.currentAmount = newGoal.targetAmount; // Make it with the same value for %
                            
                            // Create new notificaion
                            await Notification.create({
                                userId: req.user.id,
                                title: "¡Meta completada! 🎉",
                                type: "Goal",
                                description: `Has alcanzado tu meta "${newGoal.title}". ¡Excelente trabajo!`,
                                read: false
                            })

                        } else {
                            newGoal.state = "InProgress"
                        }

                        await newGoal.save();
                    }
                }
            } else { // if its the same goal
                // Get goal
                const goal = await Goal.findOne({ where: { id: newTransaction.goalId } });

                // If there's no goal
                if (!goal) {
                    const error = new Error("Esta meta no existe.");
                    res.status(409).json({ error: error.message });
                    return;
                }

                // Update value
                goal.currentAmount = goal.currentAmount - oldTransaction.amount + newTransaction.amount

                // Mark as completed if the current amount is equal or higher than the target amount
                if (goal.currentAmount >= goal.targetAmount) {
                    // Mark goal as completed
                    goal.state = "Completed";
                    goal.currentAmount = goal.targetAmount; // Make it with the same value for %
                    
                    // Create new notificaion
                    await Notification.create({
                        userId: req.user.id,
                        title: "¡Meta completada! 🎉",
                        type: "Goal",
                        description: `Has alcanzado tu meta "${goal.title}". ¡Excelente trabajo!`,
                        read: false
                    })
                } else {
                    goal.state = "InProgress"
                }

                await goal.update({
                    currentAmount: goal.currentAmount,
                    state: goal.state
                });
            }
        }

        // Update changes
        await oldTransaction.update(req.body);

        res.json("Registro de movimiento actualizado con éxito.");
    }

    // Delete transaction with it's id
    static deleteById = async (req: Request, res: Response) => {
        const transaction = req.transaction;

        // If the transaction is associated with a goal
        const goalId = req.transaction.goalId; // Get goal id from transaction
        if (goalId) {
            const goal = await Goal.findOne({ where: { id: goalId } });
            if (goal) {
                goal.currentAmount -= transaction.amount;

                // Check that current amount value is not 0
                if(goal.currentAmount < 0) goal.currentAmount = 0

                // Mark as completed if the current amount is equal or higher than the target amount
                if (goal.currentAmount >= goal.targetAmount) {
                    goal.state = "Completed";
                    goal.currentAmount = goal.targetAmount;
                } else {
                    goal.state = "InProgress"
                }

                await goal.save();
            }
        }

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

            const transactions = await Transaction.findAll({
                where: {
                    userId: userId,
                }
            });

            const searchResult = transactions.filter(transaction =>
                transaction.title.toLowerCase().includes((transactionQuery as string).trim())
            );

            if (!searchResult  || searchResult.length === 0) {
                const error = new Error(`El movimiento "${transactionQuery}}" no existe.`);
                res.status(409).json({ error: error.message });
                return;
            }

            // Return transactions list
            res.json(searchResult)
        } catch (error) {
            res.status(500).json({ error: "Error al buscar movimiento." })
        }
    }
}