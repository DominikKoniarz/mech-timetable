import { useCallback, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useTranslations } from "next-intl";
import useSelectedDay from "./use-selected-day";

const useMobileTimetable = () => {
    const t = useTranslations("mainPage.table.tableHead");

    const [selectedDay, setSelectedDay] = useState<number>(useSelectedDay());

    const weekdays = useMemo(
        () => [
            t("monday"),
            t("tuesday"),
            t("wednesday"),
            t("thursday"),
            t("friday"),
        ],
        [t],
    );

    const handlePreviousDay = useCallback(() => {
        const newIndex =
            selectedDay > 0 ? selectedDay - 1 : weekdays.length - 1;
        setSelectedDay(newIndex);
    }, [selectedDay, weekdays.length]);

    const handleNextDay = useCallback(() => {
        const newIndex =
            selectedDay < weekdays.length - 1 ? selectedDay + 1 : 0;
        setSelectedDay(newIndex);
    }, [selectedDay, weekdays.length]);

    // Setup swipe handlers for mobile navigation
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            handleNextDay();
        },
        onSwipedRight: () => {
            handlePreviousDay();
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    return {
        weekdays,
        selectedDay,
        handlePreviousDay,
        handleNextDay,
        swipeHandlers,
    };
};

export default useMobileTimetable;
