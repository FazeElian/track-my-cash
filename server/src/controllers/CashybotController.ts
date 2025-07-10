import { Request, Response } from "express";

// OPEN AI
import OpenAI from "openai";

// Models
import Goal from "../models/Goal";
import Transaction from "../models/Transaction";

// Utils
import { getModulesStats } from "../utils/cashy";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export class CashybotController {
    static new = async (req: Request, res: Response) => {
        try {
            // Message sent by the user
            const { prompt } = req.body;

            // Get user
            const userId = req.user.id

            // Get all transactions & goals
            const allTransactions = await Transaction.findAll({ where: { userId: userId } })
            const allGoals = await Goal.findAll({ where: { userId: userId } })

            // List of transactions & goals
            const { transactions, goals } = getModulesStats(allGoals, allTransactions)

            const completion = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
                            Eres Cashy, un asistente financiero virtual amable, claro y personalizado que ayuda al usuario a entender sus finanzas personales.
                            Ayudas al usuario a entender sus finanzas personales, incluyendo ingresos, gastos, metas y hábitos financieros.
                            Responde de forma breve y útil, usando lenguaje amigable y sencillo. Si tienes cifras o datos, sé preciso. 
                            Puedes hacer sugerencias de ahorro, felicitar al usuario si ha cumplido metas, y alertar con respeto si se detectan comportamientos riesgosos.

                            📊 Movimientos:
                            ${transactions}

                            🎯 Metas:
                            ${goals}
                            
                            Si el usuario te pregunta sobre sus registros, usa los datos proporcionados en la conversación para responder.
                            Si el usuario pregunta sobre su progreso, compáralo con sus metas.
                            Siempre responde como si fueras parte del equipo de Track My Cash.
                        `
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
            })
            // Send response to client
            res.send(completion.choices[0].message.content)
        } catch (error) {
            res.status(500).json({ error: "Error al hablar con Cashy, inténtelo más tarde" })
            console.log("Error Cashy BOT (new): ", error)
        }
    }
}