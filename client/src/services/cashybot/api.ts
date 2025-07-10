import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

export async function newMessage (prompt: string) {
    try {
        const { data } = await api.post("/admin/cashybot/new", { prompt });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error || "Ha ocurrido un error, inténtelo más tarde";
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}