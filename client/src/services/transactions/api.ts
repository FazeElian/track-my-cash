import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { Transaction, TransactionForm } from "../../lib/types/services/transaction.type";

export async function getAllTransactions () {
    try {
        const { data } = await api.get<Transaction[]>("/admin/transactions/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function newTransaction (transactionData: TransactionForm) {
    try {
        const { data } = await api.post("/admin/transactions/new", transactionData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function deleteTransaction (id: number) {
    try {
        const { data } = await api.delete(`/admin/transactions/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}