import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { GoalForm } from "../../lib/types/services/goal.type";

// API Calls
import { newGoal } from "./api";

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