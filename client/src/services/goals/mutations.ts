import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { GoalForm } from "../../lib/types/services/goal.type";

// API Calls
import { deleteGoal, newGoal, reActivate, updateGoal } from "./api";

// Register new goal mutation
export const useNewGoalMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: GoalForm) => newGoal(data),
        onSuccess: (response) => {
            // Refetch goals list
            queryClient.refetchQueries({ queryKey: ["goals"] })

            // Sucess toast
            toast.success(response);
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Re activate goal mutation
export const useReActivateGoalMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => reActivate(id),
        onSuccess: (response) => {
            // Refetch goals list
            queryClient.refetchQueries({ queryKey: ["goals"] })

            // Sucess toast
            toast.success(response);
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}


// Update goal mutation
export const useUpdateGoalMutation = (id: number) => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: GoalForm) => updateGoal(data, id),
        onSuccess: (response) => {
            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["goal", id],
            });

            // Refetch goals list
            queryClient.refetchQueries({ queryKey: ["goals"] })

            // Sucess toast
            toast.success(response);
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}


// Delete goal mutation
export const useDeleteGoalMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteGoal(id),
        onSuccess: (response) => {
            // Refetch goals list
            queryClient.refetchQueries({ queryKey: ["goals"] })

            // Sucess toast
            toast.success(response);
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}