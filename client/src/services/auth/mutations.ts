import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
import type {
    ConfirmUserAccount,
    ForgotPassword,
    LoginUser,
    RegisterUser,
    ResetPassword,
    ValidateCode
} from "../../lib/types/services/user.type";

// API Calls
import {
    registerUser,
    login,
    confirmAccount,
    forgotPassword,
    validateCode,
    resetPassword
} from "./api";

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

// Confirm user account
export const useConfirmAccountMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    return useMutation({
        mutationFn: (data: ConfirmUserAccount) => confirmAccount(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response)

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

// Forgot password
export const useForgotPasswordMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    return useMutation({
        mutationFn: (data: ForgotPassword) => forgotPassword(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response)

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

// Forgot password
export const useValidateCodeMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Redirection
    const redirect = useNavigate()

    return useMutation({
        mutationFn: (data: ValidateCode) => validateCode(data),
        onSuccess: (code) => {
            // Redirection
            redirect(`/auth/reset-password/${code}`)

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

// Reset Password
export const useResetPasswordMutation = (code: string) => {
    // Query client
    const queryClient = new QueryClient()

    return useMutation({
        mutationFn: (data: ResetPassword) => resetPassword(data, code),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response)

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