import { client } from "@/lib/eden-client";
import { queryOptions } from "@tanstack/react-query";
import { timetableCache } from "./timetable-cache";

export function timetableQueryOptions(profileIndex: number) {
    return queryOptions({
        queryKey: timetableCache.rowsKey(profileIndex),
        queryFn: async () => {
            const { data, status } = await client.api
                .timetable({
                    profileIndex,
                })
                .get();

            if (status !== 200) {
                throw new Error("Failed to fetch rows");
            }

            if (data instanceof Response || data === null) {
                throw new Error("Failed to fetch rows");
            }

            return data;
        },
        staleTime: 1000 * 60 * 15,
        retry: 1,
    });
}
