import { client } from "@/lib/eden-client";
import { useQuery } from "@tanstack/react-query";

const useFetchDepartments = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["add-profile", "departments"],
        queryFn: async () => {
            const { data, status } = await client.api.departments.get();

            if (status !== 200) {
                throw new Error("Failed to fetch departments");
            }

            if (data instanceof Response || data === null) {
                throw new Error("Failed to fetch departments");
            }

            return data.departments;
        },
        staleTime: 1000 * 60 * 15, // 15 minutes
        retry: 1,
    });

    return {
        departments: data ?? [],
        isLoading,
        isError,
    };
};

export default useFetchDepartments;
