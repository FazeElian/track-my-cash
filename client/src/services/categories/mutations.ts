import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { CategoryForm } from "../../lib/types/services/category.type";

// API Calls
import { addCategory, deleteCategory, updateCategory } from "./api";

// Query
import { useFetchAllCategories } from "./queries";

// Add category mutation
export const useAddCategoryMutation = () => {
    // Query client
    const queryClient = new QueryClient()

    // Refetch categories list
    const { refetch } = useFetchAllCategories()

    return useMutation({
        mutationFn: (data: CategoryForm) => addCategory(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);
        
            // Get the categories list updated
            refetch()

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

export const useUpdateCategoryMutation = (id: number) => {
    // Query client
    const queryClient = new QueryClient()

    // Refetch categories list
    const { refetch } = useFetchAllCategories()

    return useMutation({
        mutationFn: (data: CategoryForm) => updateCategory(data, id),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response.message);

            refetch()

            queryClient.invalidateQueries({
                queryKey: ["category", id],
            });
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