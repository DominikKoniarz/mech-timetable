import { departmentGroupsQueryOptions } from "@/features/department/department-query-options";
import { useQuery } from "@tanstack/react-query";

const useFetchDepartmentGroups = (departmentName: string | null) => {
    const { data, isLoading, isError, refetch } = useQuery(
        departmentGroupsQueryOptions(departmentName),
    );

    return {
        groupsByFirstLetter: data ?? null,
        isLoading,
        isError,
        refetch,
    };
};

export default useFetchDepartmentGroups;
