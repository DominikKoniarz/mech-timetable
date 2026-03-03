import { redirect } from "@/i18n/routing";
import { client } from "@/lib/eden-client";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const useFetchTimetable = () => {
    const locale = useLocale();

    const profileIndex = 0;

    const {
        data: rows,
        isLoading,
        isFetched,
    } = useQuery({
        queryKey: ["rows", profileIndex],
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

            return data.rows;
        },
        staleTime: 1000 * 60 * 15, // 15 minutes
        retry: 1,
    });

    useEffect(() => {
        if (isFetched && rows === undefined) {
            redirect({
                href: "/welcome",
                locale,
            });
        }
    }, [rows, locale, isFetched]);

    return { rows, isLoading };
};

export default useFetchTimetable;
