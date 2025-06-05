import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllTransactions } from "./api";

export const useFetchAllTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: getAllTransactions,
        retry: 1,
        refetchOnWindowFocus: false
    });
}