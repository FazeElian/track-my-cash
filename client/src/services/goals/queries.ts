import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllGoals } from "./api";

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