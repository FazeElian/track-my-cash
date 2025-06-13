import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { GoalForm } from "../../lib/types/services/goal.type";

// API Calls
import { newGoal } from "./api";

// Register new goal mutation
export const useNewGoalMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    return useMutation({
        mutationFn: (data: GoalForm) => newGoal(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);
        
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