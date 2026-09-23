import "server-only";

import { getUserPreferences } from "@/features/user/user-queries";
import { getDepartmentByName } from "@/features/department/department-queries";
import { fetchDepartmentData } from "@/lib/data/fetcher";
import { parseRows } from "@/lib/data/parser";
import { getProfileFromParams } from "@/lib/data/helpers";

export async function getTimetableForProfile(profileIndexFromParams: number) {
    const preferences = await getUserPreferences();

    if (!preferences) {
        return { error: "bad-request" as const };
    }

    const result = getProfileFromParams(profileIndexFromParams, preferences);

    if (!result) {
        return { error: "profile-not-found" as const };
    }

    const { profile, profileIndex } = result;

    const foundDepartment = await getDepartmentByName(profile.departmentName);

    if (!foundDepartment) {
        return { error: "department-not-found" as const };
    }

    const departmentHtml = await fetchDepartmentData(foundDepartment.url);

    if (!departmentHtml) {
        return { error: "department-not-found" as const };
    }

    const rows = parseRows(departmentHtml, profile.groups);

    return {
        profileIndex,
        rows,
    };
}
