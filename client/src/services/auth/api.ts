import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { RegisterUser } from "../../lib/types/modules/user.type";

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