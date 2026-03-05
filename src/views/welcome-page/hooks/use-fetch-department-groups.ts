import type { GroupsByFirstLetter } from "@/types/groups";
import { client } from "@/lib/eden-client";
import { useQuery } from "@tanstack/react-query";

type DepartmentGroupsData = GroupsByFirstLetter | null;

const getQueryKey = (departmentName: string | null) => {
    return ["welcome", "department-groups", departmentName];
};

const useFetchDepartmentGroups = (departmentName: string | null) => {
    const { data, isLoading, isError, refetch } =
        useQuery<DepartmentGroupsData>({
            queryKey: getQueryKey(departmentName),
            queryFn: async () => {
                if (!departmentName) {
                    return null;
                }

                const { data, status } = await client.api
                    .departments({
                        departmentName,
                    })
                    .groups.get();

                if (status !== 200) {
                    if (status === 404) {
                        return null;
                    }

                    throw new Error("Failed to fetch department groups");
                }

                if (data instanceof Response || data === null) {
                    throw new Error("Failed to fetch department groups");
                }

                return data.groupsByFirstLetter;
            },
            enabled: Boolean(departmentName),
            staleTime: 1000 * 60 * 15, // 15 minutes
            retry: 1,
        });

    return {
        groupsByFirstLetter: data ?? null,
        isLoading,
        isError,
        refetch,
    };
};

export default useFetchDepartmentGroups;
