import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { AddCategory } from "../../lib/types/services/category.type";

// API Calls
import { addCategory, deleteCategory } from "./api";

// Query
import { useFetchAllCategories } from "./queries";

// Add category mutation
export const useAddCategoryMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    return useMutation({
        mutationFn: (data: AddCategory) => addCategory(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            })
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

export const useDeleteCategoryMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Refetch categories list
    const { refetch } = useFetchAllCategories()

    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            refetch()

            queryClient.refetchQueries({
                queryKey: ["categories"]
            });
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}