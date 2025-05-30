import { useQuery } from "@tanstack/react-query"

// API Calls
import { getUser } from "./api"

export const useGetAuthenticatedUser = () => {
    const { data: user, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    });

    // If is loading
    if (isLoading) {
        return "Loading"
    }

    // If user is not authenticated or there's an error
    if(!user || isError) {
        return "Not Authenticated";
    }

    return user;
}