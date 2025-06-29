import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
import type {
    ConfirmUserAccount,
    ForgotPassword,
    LoginUser,
    RegisterUser,
    ResetPassword,
    UpdateBasicInfo,
    UpdatePassword,
    ValidateCode
} from "../../lib/types/services/user.type";

// API Calls
import {
    registerUser,
    login,
    confirmAccount,
    forgotPassword,
    validateCode,
    resetPassword,
    updatePassword,
    updateBasicInfo
} from "./api";
import { useFetchUser } from "./queries";

// Register user mutation
export const useRegisterMutation = () => {
    // Query client
    const queryClient = useQueryClient()

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
    const queryClient = useQueryClient()

    // Redirection
    const redirect = useNavigate()

    return useMutation({
        mutationFn: (data: LoginUser) => login(data),
        onSuccess: (response) => {
            // Save JWT on localStorage
            localStorage.setItem("AUTH_TOKEN", response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })

            // Redirect to admin dashboard
            redirect("/admin/dashboard")
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Confirm user account
export const useConfirmAccountMutation = () => {
    return useMutation({
        mutationFn: (data: ConfirmUserAccount) => confirmAccount(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response)
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Forgot password
export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: (data: ForgotPassword) => forgotPassword(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response)
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Forgot password
export const useValidateCodeMutation = () => {
    // Redirection
    const redirect = useNavigate()

    return useMutation({
        mutationFn: (data: ValidateCode) => validateCode(data),
        onSuccess: (code) => {
            // Redirection
            redirect(`/auth/reset-password/${code}`)
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
    const queryClient = useQueryClient()

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

// Update password
export const useUpdatePasswordMutation = () => {
    return useMutation({
        mutationFn: (data: UpdatePassword) => updatePassword(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Update basic info
export const useUpdateBasicInfoMutation = () => {
    // Redirection
    const redirect = useNavigate()

    // Refetch user info
    const { refetch } = useFetchUser()

    return useMutation({
        mutationFn: (data: UpdateBasicInfo) => updateBasicInfo(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Refetch user info
            refetch()

            // Redirection to account main view
            redirect("/admin/account")
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}