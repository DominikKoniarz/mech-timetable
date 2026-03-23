import { redirect } from "@/i18n/routing";
import { client } from "@/lib/eden-client";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import {
    startTransition,
    useEffect,
    useEffectEvent,
    useLayoutEffect,
} from "react";

const getQueryKey = (profileIndex: number) => ["rows", profileIndex];
const getGenericQueryKey = () => ["rows"];

const useFetchTimetable = () => {
    const locale = useLocale();

    const queryClient = useQueryClient();

    const profileIndex = useMainPageStore((state) => state.profileIndex);
    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);

    const { data, isLoading, isFetched } = useQuery({
        queryKey: getQueryKey(profileIndex),
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
        staleTime: 1000 * 60 * 15, // 15 minutes
        retry: 1,
    });

    const rows = data?.rows;
    const usedProfileIndex = data?.profileIndex;

    useEffect(() => {
        if (isFetched && rows === undefined) {
            redirect({
                href: "/welcome",
                locale,
            });
        }
    }, [rows, locale, isFetched]);

    useEffect(() => {
        if (
            usedProfileIndex !== undefined &&
            usedProfileIndex !== profileIndex
        ) {
            startTransition(() => {
                setProfileIndex(usedProfileIndex);
            });
        }
    }, [usedProfileIndex, setProfileIndex, profileIndex]);

    // clean up all queries related to all profiles
    // to avoid stale data which was causing bugs after adding profiles feature
    const cleanUp = useEffectEvent(() => {
        queryClient.removeQueries({
            queryKey: getGenericQueryKey(),
            type: "all",
        });
    });

    useLayoutEffect(() => {
        return () => {
            cleanUp();
        };
    }, []);

    return { rows, isLoading };
};

export default useFetchTimetable;

export const useInvalidateTimetableCacheByIndex = () => {
    const queryClient = useQueryClient();

    const invalidate = (index: number) => {
        queryClient.invalidateQueries({ queryKey: getQueryKey(index) });
    };

    return { invalidate };
};
