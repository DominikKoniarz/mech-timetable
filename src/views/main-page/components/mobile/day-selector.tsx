import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMainPageStore } from "../../context/main-page-provider";

type Props = {
    selectedDay: number;
    handleNextDay: () => void;
    handlePreviousDay: () => void;
    weekdays: string[];
};

export default function DaySelector({
    selectedDay,
    handleNextDay,
    handlePreviousDay,
    weekdays,
}: Props) {
    const t = useTranslations("mainPage.table.mobile");

    const { displayNextWeek, toggleDisplayNextWeek } = useMainPageStore(
        (state) => state,
    );

    return (
        <div className="bg-card sticky top-0 z-10 flex h-20 w-full items-center justify-between overflow-hidden shadow-sm">
            <Button
                onClick={handlePreviousDay}
                className="hover:bg-muted text-foreground flex h-fit w-fit cursor-pointer items-center justify-center rounded-none bg-transparent !p-4 shadow-none transition-colors"
                aria-label={t("prevDay")}
            >
                <ChevronLeft className="size-5" />
            </Button>

            <div className="relative flex flex-1 flex-col items-center justify-center py-3">
                <button
                    type="button"
                    className="flex cursor-pointer flex-col items-center gap-0"
                    onClick={toggleDisplayNextWeek}
                >
                    <span className="text-sm font-medium">
                        {weekdays[selectedDay]}
                    </span>
                    <span className="w-fit text-[13px] italic">
                        ({displayNextWeek ? t("nextWeek") : t("currentWeek")})
                    </span>
                </button>
                <div className="mt-1.5 flex gap-1.5">
                    {weekdays.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                selectedDay === index
                                    ? "bg-primary"
                                    : "bg-muted",
                            )}
                            aria-hidden="true"
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={handleNextDay}
                className="hover:bg-muted text-foreground h-fit w-fit cursor-pointer items-center justify-center rounded-none bg-transparent !p-4 shadow-none transition-colors"
                aria-label={t("nextDay")}
            >
                <ChevronRight className="size-5" />
            </Button>
        </div>
    );
}
