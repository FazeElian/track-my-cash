import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { TransactionForm } from "../../lib/types/services/transaction.type";

// API Calls
import { deleteTransaction, newTransaction } from "./api";

// Query
import { useFetchAllTransactions } from "./queries";

// Register new transaction mutation
export const useNewTransactionMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Refetch categories list
    const { refetch } = useFetchAllTransactions()

    return useMutation({
        mutationFn: (data: TransactionForm) => newTransaction(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);
        
            // Get the categories list updated
            refetch()

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            })
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Delete transaction mutation
export const useDeleteTransactionMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Refetch categories list
    const { refetch } = useFetchAllTransactions()

    return useMutation({
        mutationFn: (id: number) => deleteTransaction(id),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            refetch()

            queryClient.refetchQueries({
                queryKey: ["categories"]
            });
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}