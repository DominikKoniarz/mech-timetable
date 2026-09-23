import { departmentsQueryOptions } from "@/features/department/department-query-options";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useEffectEvent, useState } from "react";

const useFetchDepartments = (externalEnabled: boolean) => {
    const [enabled, setEnabled] = useState(externalEnabled);

    const { data, isLoading, isError } = useQuery({
        ...departmentsQueryOptions(),
        enabled,
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
