// Models
import Goal from "../models/Goal";
import Transaction from "../models/Transaction";

export const getModulesStats = (allGoals: Goal[], allTransactions: Transaction[]) => {
    const transactions = allTransactions?.map(transaction => {
        return `• ${transaction.type === "Income" ? "Ingreso" : "Gasto"}
        
        de $${transaction.amount} el ${transaction.date} llamado ${transaction.title}`;
    }).join("\n") || "No tiene transacciones registradas.";
    
    const goals = allGoals?.map(goal => {
        return `
            • ${
                goal.priorityLevel === "Low" ? "Baja"
                : goal.priorityLevel === "Medium" ? "Media"
                : "Alta"
            }
            su título es ${goal.title}, describida como ${goal.description} con fecha límite $${goal.deadline}, categoría ${goal.category}
            de $${goal.targetAmount} y el usuario ha acumulado ${goal.currentAmount},
            su estado es ${
                goal.state === "Completed" ? "Completada"
                : goal.state === "InProgress" ? "En progreso"
                : "Vencida"
            }
        `;
    }).join("\n") || "No tiene transacciones registradas.";

    return { transactions, goals };
}