import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { GoalForm } from "../../lib/types/services/goal.type";

// API Calls
import { deleteGoal, newGoal, updateGoal } from "./api";

// Query
import { useFetchAllGoals } from "./queries";

// Register new goal mutation
export const useNewGoalMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Get goals list updated
    const { refetch } = useFetchAllGoals()

    return useMutation({
        mutationFn: (data: GoalForm) => newGoal(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);
        
            // Refetch goals list
            refetch()

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["goals"]
            })
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
    const queryClient = new QueryClient()

    // Refetch categories list
    const { refetch } = useFetchAllGoals()

    return useMutation({
        mutationFn: (data: GoalForm) => updateGoal(data, id),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["goal", id],
            });

            // Get the goals list updated
            refetch()
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
    const queryClient = new QueryClient()

    // Refetch goals list
    const { refetch } = useFetchAllGoals()

    return useMutation({
        mutationFn: (id: number) => deleteGoal(id),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Get the goals list updated
            refetch()
            
            // Invalidate queries
            queryClient.refetchQueries({
                queryKey: ["goals"]
            });
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}