import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { TransactionForm } from "../../lib/types/services/transaction.type";

// API Calls
import { deleteTransaction, newTransaction, updateTransaction } from "./api";

// Register new transaction mutation
export const useNewTransactionMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TransactionForm) => newTransaction(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);
        
            // Refetch transactions list
            queryClient.refetchQueries({ queryKey: ["transactions"] })

            // Refetch notifications list
            queryClient.refetchQueries({ queryKey: ["notifications"] })
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Update transaction mutation
export const useUpdateTransactionMutation = (id: number) => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TransactionForm) => updateTransaction(data, id),
        onSuccess: (response) => {
            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["transaction", id],
            });

            // Refetch transactions list
            queryClient.refetchQueries({ queryKey: ["transactions"] });

            // Refetch notifications list
            queryClient.refetchQueries({ queryKey: ["notifications"] })

            // Sucess toast
            toast.success(response);
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
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteTransaction(id),
        onSuccess: (response) => {
            // Invalidate queries
            queryClient.refetchQueries({ queryKey: ["transactions"] });
            
            // Refetch notifications list
            queryClient.refetchQueries({ queryKey: ["notifications"] })

            // Sucess toast
            toast.success(response);
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}