import { useQuery } from "@tanstack/react-query";
import { getStats } from "./api";

export const useGetStats = () => {
    const { data: stats } = useQuery({
        queryKey: ["stats"],
        queryFn: getStats,
        retry: 1,
        refetchOnWindowFocus: true
    });

    if(!stats) {
        return "Error"
    }

    return stats
}