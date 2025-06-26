import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllNotifications } from "./api"

export const useFetchAllNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getAllNotifications,
        retry: 1,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
}