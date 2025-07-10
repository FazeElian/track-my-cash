import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// API Calls
import { newMessage } from "./api";

export const useNewMessageMutation = () => {
    return useMutation({
        mutationFn: (prompt: string) => newMessage(prompt),
        onSuccess: (response) => {
            return response
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}