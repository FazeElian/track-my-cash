import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { Goal, GoalForm } from "../../lib/types/services/goal.type";

export async function getAllGoals () {
    try {
        const { data } = await api<Goal[]>("/admin/goals/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function getGoalById (id: number) {
    try {
        const { data } = await api<Goal>(`/admin/goals/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function newGoal (goalData: GoalForm) {
    try {
        const { data } = await api.post("/admin/goals/new", goalData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function updateGoal (goalData: GoalForm, id: number) {
    try {
        const { data } = await api.put(`/admin/goals/${id}`, goalData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}

export async function deleteGoal (id: number) {
    try {
        const { data } = await api.delete(`/admin/goals/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}