import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

export async function getStats () {
    try {
        const { data } = await api.get("/admin/dashboard/stats");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function getSummary () {
    try {
        const { data } = await api.get("/admin/dashboard/summary");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}