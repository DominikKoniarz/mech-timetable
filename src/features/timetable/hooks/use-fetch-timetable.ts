import { redirect } from "@/i18n/routing";
import { timetableCache } from "@/features/timetable/timetable-cache";
import { timetableQueryOptions } from "@/features/timetable/timetable-query-options";
import { useMainPageStore } from "@/features/timetable/providers/timetable-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import {
    startTransition,
    useEffect,
    useEffectEvent,
    useLayoutEffect,
} from "react";

const useFetchTimetable = () => {
    const locale = useLocale();

    const queryClient = useQueryClient();

    const profileIndex = useMainPageStore((state) => state.profileIndex);
    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);

    const { data, isLoading, isFetched } = useQuery(
        timetableQueryOptions(profileIndex),
    );

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
            queryKey: timetableCache.rowsPrefixKey,
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
        queryClient.invalidateQueries({
            queryKey: timetableCache.rowsKey(index),
        });
    };

    return { invalidate };
};
