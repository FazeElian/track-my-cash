import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
import type { LoginUser, RegisterUser } from "../../lib/types/modules/user.type";

// API Calls
import { login, registerUser } from "./api";

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

// Login mutation
export const useLoginMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Redirection
    const redirect = useNavigate()

    return useMutation({
        mutationFn: (data: LoginUser) => login(data),
        onSuccess: (response) => {
            // Save JWT on localStorage
            localStorage.setItem("AUTH_TOKEN", response);
    
            // Redirect to admin dashboard
            redirect("/admin/dashboard")

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