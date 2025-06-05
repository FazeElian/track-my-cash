import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllCategories, getCategoryById } from "./api"

export const useFetchAllCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
        retry: 1,
        refetchOnWindowFocus: false
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