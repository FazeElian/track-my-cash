import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllCategories } from "./api"

export const useFetchAllCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
        refetchOnWindowFocus: false
    });
}

export const useGetAllCategories = () => {
    const { data: categories, isError, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
        retry: 1,
        refetchOnWindowFocus: false
    });

    // If is loading
    if (isLoading) {
        return "Loading"
    }

    // If there's no categories or there's an error
    if(!categories || isError) {
        return null;
    }

    return categories;
}