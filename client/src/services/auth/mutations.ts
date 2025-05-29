import { QueryClient, useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
import type { RegisterUser } from "../../lib/types/modules/user.type";

// API Calls
import { registerUser } from "./api";

// Register user mutation
export const useRegisterMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    return useMutation({
        mutationFn: (data: RegisterUser) => registerUser(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}