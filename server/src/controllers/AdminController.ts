import { Request, Response } from "express";
import { Op } from "sequelize";

// Models
import Transaction from "../models/Transaction";

// Utils
import { getCurrentMonth, getLast6Months, getLast6MonthsArray } from "../utils/date";

export class AdminController {
    // Stats
    static getStats = async (req: Request, res: Response) => {
        try {
            // User id
            const userId = req.user.id

            // Current month
            const { startDate, endDate } = await getCurrentMonth()
            console.log(startDate, endDate)

            // Get the list of transactions & expenses by user
            const transactions = await Transaction.findAll({
                where: {
                    userId,
                    type: "Income",
                    state: "Completed",
                    date: {
                        [Op.between] : [startDate, endDate]
                    }
                }
            })

            const expenses = await Transaction.findAll({
                where: {
                    userId,
                    type: "Expense",
                    date: {
                        [Op.between] : [startDate, endDate]
                    }
                }
            })

            // Total value in transactions
            let totalIncomes = 0 // Initialize value
            transactions.forEach(transaction => {
                const transactionAmount = transaction.amount
                totalIncomes += transactionAmount
            });

            // Total value in expenses
            let totalExpenses = 0 // Initialize value
            expenses.forEach(transaction => {
                const transactionAmount = transaction.amount
                totalExpenses += transactionAmount
            }); 

            // Calc balance
            const totalBalance = totalIncomes - totalExpenses

            // Return values for the dashboard
            res.json({ totalIncomes, totalExpenses, totalBalance })
        } catch (error) {
            res.status(500).json({ error: "Error getting total incomes of the user" })
        }
    }

    // Monthly summary
    static getSummary = async (req: Request, res: Response) => {
        try {
            // User id
            const userId = req.user.id

            // Current month
            const { startDate, endDate } = await getLast6Months()

            // Get the list of transactions & expenses by user
            const transactions = await Transaction.findAll({
                where: {
                    userId,
                    type: {
                        [Op.in]: ["Income", "Expense"]
                    },
                    date: {
                        [Op.gte]: startDate
                    },
                    state: "Completed",
                }
            })

            const totals = {}; // Initialize values

            // Get previous months []
            const last6Months = getLast6MonthsArray();
            last6Months.forEach(month => {
                totals[month] = { incomes: 0, expenses: 0 };
            });

            // Total value in transactions
            transactions.forEach(transaction => {
                const month = new Date(transaction.date).toISOString().slice(0, 7);

                if (!totals[month]) return; // Ignore months out of range

                if (transaction.type === "Income") {
                    totals[month].incomes += transaction.amount;
                } else if (transaction.type === "Expense") {
                    totals[month].expenses += transaction.amount;
                }
            });

            // Total value in expenses
            const formattedTransactions = Object.entries(totals).map(([month, data]) => ({
                month,
                ...(data as object)
            }));

            // Return values for the dashboard
            res.json(formattedTransactions)
        } catch (error) {
            res.status(500).json({ error: "Error getting monthly resume of the user" })
        }
    }

    // Expenses by category
    static getExpensesByCategory = async (req: Request, res: Response) => {
        try {
            // User id
            const userId = req.user.id

            // Get all transactions
            const transactions = await Transaction.findAll({
                where: {
                    userId,
                    type: "Expense",
                    state: "Completed",
                }
            })

            // Get the amount by category
            const amountByCategory: { [key: number]: number } = {}; // Initialize amounts
            let totalAmountCategories = 0 //  Initialize total

            transactions.forEach(transaction => {
                // Get category from transaction id
                const category = transaction.categoryId;

                // If there's no category
                if (!amountByCategory[category]) {
                    amountByCategory[category] = 0;
                }

                // Sum getting the total amout of every category
                amountByCategory[category] += transaction.amount;
            });

            // Calc total - sum amountByCategory values
            totalAmountCategories = Object.values(amountByCategory).reduce((sum, amount) => sum + amount, 0);

            // Calc percentages
            const percentagesByCategory: { [key: number]: number } = {};
            for (const categoryId in amountByCategory) {
                percentagesByCategory[categoryId] = Math.round(
                    (amountByCategory[categoryId] / totalAmountCategories) * 100
                );
            }

            // Return percentages by category
            res.json({ percentagesByCategory });
        } catch (error) {
            res.status(500).json({ error: "Error getting expenses by category" })
        }
    }
}