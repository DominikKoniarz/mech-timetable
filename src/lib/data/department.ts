import "server-only";

import type { Department } from "@/types/departments";
import { fetchDepartmentData, fetchDepartmentsList } from "./fetcher";
import { parseDepartmentsList, parseGroups } from "./parser";

export const getDepartments = async (): Promise<Department[]> => {
    const departmentsHtml = await fetchDepartmentsList();

    return parseDepartmentsList(departmentsHtml);
};

export const getDepartmentGroups = async (department: Department) => {
    const departmentData = await fetchDepartmentData(department.url);

    return parseGroups(departmentData);
};

// export const getDepartmentRows = async (
// department: Department,
// userPreferences: { departmentName: string },
