import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import type { AddCategory } from "../../lib/types/services/category.type";

// API Calls
import { addCategory } from "./api";

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
            console.log(error)
        },
    })
}