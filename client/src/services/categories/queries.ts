import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllCategories, getCategoryById, searchCategory } from "./api"

interface SearchProps {
    searchQuery: string;
}

export const useFetchAllCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true
    });
}

export const useGetAllCategories = ({ searchQuery } : SearchProps) => {
    const queryKey = searchQuery
            ? ["categories", "search", searchQuery]
            : ["categories", "all"]

    return useQuery({
        queryKey: queryKey,
        queryFn: () => 
            searchQuery
                ? searchCategory(searchQuery)
                : getAllCategories(),
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true
    });
}

export const useGetCategoryById = (id: number) => {
    return useQuery({
        queryKey: ["category", id!],
        queryFn: () => getCategoryById(id),
        refetchOnWindowFocus: false,
        enabled: !!id
    });
}