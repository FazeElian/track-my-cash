import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { GoalForm } from "../../lib/types/services/goal.type";

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