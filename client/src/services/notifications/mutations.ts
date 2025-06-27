import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// API Call
import { markAsRead } from "./api";

// Query
import { useFetchAllNotifications } from "./queries";

// Mark notification as read mutation
export const useMarkAsReadMutation = () => {
    // Refetch notifications list
    const { refetch } = useFetchAllNotifications()

    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => markAsRead(id),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response)

            // Get the notifications list updated
            refetch()

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["notifications"]
            })
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}