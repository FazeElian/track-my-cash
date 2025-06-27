import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { Notification } from "../../lib/types/services/notification.type";

export async function getAllNotifications () {
    try {
        const { data } = await api<Notification[]>("/admin/notifications/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function markAsRead (id: number) {
    try {
        const { data } = await api.put(`/admin/notifications/markAsRead/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}