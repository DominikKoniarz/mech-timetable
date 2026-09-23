export const timetableCache = {
    rowsKey: (profileIndex: number) => ["rows", profileIndex] as const,
    rowsPrefixKey: ["rows"] as const,
};
