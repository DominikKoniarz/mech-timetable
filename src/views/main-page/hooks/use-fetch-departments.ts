import { client } from "@/lib/eden-client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useEffectEvent, useState } from "react";

const useFetchDepartments = (externalEnabled: boolean) => {
    const [enabled, setEnabled] = useState(externalEnabled);

    const { data, isLoading, isError } = useQuery({
        enabled,
        queryKey: ["main-page", "departments"],
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

    const effect = useEffectEvent((externalEnabled: boolean) => {
        if (enabled) return;

        setEnabled(externalEnabled);
    });

    useEffect(() => {
        effect(externalEnabled);
    }, [externalEnabled]);

    return {
        departments: data ?? [],
        isLoading,
        isError,
    };
};

export default useFetchDepartments;
