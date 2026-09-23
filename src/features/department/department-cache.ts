export const departmentCache = {
    departmentsKey: ["main-page", "departments"] as const,
    groupsKey: (departmentName: string | null) =>
        ["department-groups", departmentName] as const,
};
