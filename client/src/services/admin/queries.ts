import { useQuery } from "@tanstack/react-query";
import { getExpensesByCategory, getStats, getSummary } from "./api";

export const useGetStats = () => {
    const { data: stats } = useQuery({
        queryKey: ["stats"],
        queryFn: getStats,
        retry: 1,
        refetchOnWindowFocus: true
    });

    if(!stats) {
        return "Error"
    }

    return stats
}

export const useGetSummary = () => {
    return useQuery({
        queryKey: ["summary"],
        queryFn: getSummary,
        retry: 1,
        refetchOnWindowFocus: true
    });
}

export const useGetExpensesByCategory = () => {
    return useQuery({
        queryKey: ["expensesByCategory"],
        queryFn: getExpensesByCategory,
        retry: 1,
        refetchOnWindowFocus: true
    });
}