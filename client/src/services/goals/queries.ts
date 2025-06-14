import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllGoals, getGoalById } from "./api";

export const useFetchAllGoals = () => {
    return useQuery({
        queryKey: ["goals"],
        queryFn: getAllGoals,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true
    });
}

export const useGetGoalById = (id: number) => {
    return useQuery({
        queryKey: ["goal", id!],
        queryFn: () => getGoalById(id),
        refetchOnWindowFocus: false,
        enabled: !!id
    });
}