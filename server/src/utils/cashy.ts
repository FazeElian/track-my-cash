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
        • Meta: "${goal.title}" (${
                goal.priorityLevel === "Low" ? "Baja"
                : goal.priorityLevel === "Medium" ? "Media"
                : "Alta"
            } prioridad)  
            Descripción: ${goal.description}  
            Categoría: ${goal.category}  
            Fecha límite: ${goal.deadline}  
            Meta total: $${goal.targetAmount.toLocaleString()}  
            Monto acumulado: $${goal.currentAmount.toLocaleString()}  
            Estado: ${
                goal.state === "Completed" ? "Completada"
                : goal.state === "InProgress" ? "En progreso"
                : "Vencida"
            }`;
    }).join("\n\n") || "No tiene metas registradas.";

    return { transactions, goals };
}