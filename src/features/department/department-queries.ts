import "server-only";

import type { Department } from "@/types/departments";
import { fetchDepartmentData, fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList, parseGroups } from "@/lib/data/parser";

export async function getDepartments(): Promise<Department[]> {
    const departmentsHtml = await fetchDepartmentsList();

    return parseDepartmentsList(departmentsHtml);
}

export async function getDepartmentByName(departmentName: string) {
    const departments = await getDepartments();

    return (
        departments.find((department) => department.name === departmentName) ??
        null
    );
}

export async function getDepartmentGroupsByName(departmentName: string) {
    const department = await getDepartmentByName(departmentName);

    if (!department) {
        return null;
    }

    const departmentHtml = await fetchDepartmentData(department.url);

    if (!departmentHtml) {
        return null;
    }

    return { groupsByFirstLetter: parseGroups(departmentHtml) };
}
