import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { AddCategory } from "../../lib/types/services/category.type";

export async function addCategory (categoryData: AddCategory) {
    try {
        const { data } = await api.post("/admin/categories/new", categoryData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}