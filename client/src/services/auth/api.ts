import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type {
    ConfirmUserAccount,
    ForgotPassword,
    LoginUser,
    RegisterUser,
    ResetPassword,
    UpdatePassword,
    User,
    ValidateCode
} from "../../lib/types/services/user.type";

export async function registerUser (userData: RegisterUser) {
    try {
        const { data } = await api.post("/auth/register", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function login (userData: LoginUser) {
    try {
        const { data } = await api.post("/auth/login", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function getUser () {
    try {
        const { data } = await api<User>("/auth/user");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function confirmAccount (userData: ConfirmUserAccount) {
    try {
        const { data } = await api.post("/auth/confirm-account", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function forgotPassword (userData: ForgotPassword) {
    try {
        const { data } = await api.post("/auth/forgot-password", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function validateCode (userData: ValidateCode) {
    try {
        const { data } = await api.post("/auth/validate-code", userData);
        return data.code;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function resetPassword (userData: ResetPassword, code: string) {
    try {
        const { data } = await api.post(`/auth/reset-password/${code}`, userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function updatePassword (userData: UpdatePassword) {
    try {
        const { data } = await api.post("/auth/update-password/", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}