import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { CategoryForm, Category } from "../../lib/types/services/category.type";

export async function getAllCategories () {
    try {
        const { data } = await api.get<Category[]>("/admin/categories/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function getCategoryById (id: number) {
    try {
        const { data } = await api<Category>(`/admin/categories/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function addCategory (categoryData: CategoryForm) {
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

export async function updateCategory (categoryData: CategoryForm, id: number) {
    try {
        const { data } = await api.put(`/admin/categories/${id}`, categoryData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function deleteCategory (id: number) {
    try {
        const { data } = await api.delete(`/admin/categories/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}