import type { GroupsByFirstLetter } from "@/types/groups";
import { client } from "@/lib/eden-client";
import { queryOptions } from "@tanstack/react-query";
import { departmentCache } from "./department-cache";

export function departmentsQueryOptions() {
    return queryOptions({
        queryKey: departmentCache.departmentsKey,
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
        staleTime: 1000 * 60 * 15,
        retry: 1,
    });
}

export function departmentGroupsQueryOptions(departmentName: string | null) {
    return queryOptions({
        queryKey: departmentCache.groupsKey(departmentName),
        queryFn: async (): Promise<GroupsByFirstLetter | null> => {
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
        staleTime: 1000 * 60 * 15,
        retry: 1,
    });
}
