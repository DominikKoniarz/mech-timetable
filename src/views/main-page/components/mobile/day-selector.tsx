import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

    return (
        <div className="bg-card sticky top-0 z-10 flex h-14 w-full items-center justify-between overflow-hidden shadow-sm">
            <Button
                onClick={handlePreviousDay}
                className="hover:bg-muted flex h-fit w-fit cursor-pointer items-center justify-center rounded-none bg-transparent p-3 text-white transition-colors"
                aria-label={t("prevDay")}
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="relative flex flex-1 flex-col items-center justify-center py-3">
                <span className="text-sm font-medium">
                    {weekdays[selectedDay]}
                </span>
                <div className="mt-1 flex gap-1">
                    {weekdays.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-1 w-1 rounded-full",
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
                className="hover:bg-muted h-fit w-fit cursor-pointer items-center justify-center rounded-none bg-transparent p-3 text-white transition-colors"
                aria-label={t("nextDay")}
            >
                <ChevronRight className="h-5 w-5" />
            </Button>
        </div>
    );
}
