import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllTransactions, getTransactionById, searchTransaction } from "./api";

interface SearchProps {
    searchQuery: string;
}

export const useFetchAllTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: getAllTransactions,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true
    });
}

export const useGetAllTransactions = ({ searchQuery } : SearchProps) => {
    const queryKey = searchQuery
            ? ["transactions", "search", searchQuery]
            : ["transactions", "all"]

    return useQuery({
        queryKey: queryKey,
        queryFn: () => 
            searchQuery
                ? searchTransaction(searchQuery)
                : getAllTransactions(),
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true
    });
}

export const useGetTransactionById = (id: number) => {
    return useQuery({
        queryKey: ["transaction", id!],
        queryFn: () => getTransactionById(id),
        refetchOnWindowFocus: false,
        enabled: !!id
    });
}