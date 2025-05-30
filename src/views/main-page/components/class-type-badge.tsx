import type { ClassEntry } from "@/types/classes";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export default function ClassTypeBadge({
    classType,
}: {
    classType: ClassEntry["classType"];
}) {
    const t = useTranslations("mainPage.table.badge");

    const classTypeBadgeClasses: string = useMemo(() => {
        const baseClasses = "text-xs px-2 py-1 rounded absolute top-2 right-2";

        switch (classType) {
            case "LECTURE":
                return cn(baseClasses, "bg-blue-500 text-white");
            case "EXERCISES":
                return cn(baseClasses, "bg-green-500 text-white");
            case "LABORATORY":
            case "COMPUTER_LABORATORY":
                return cn(baseClasses, "bg-purple-500 text-white");
            case "PROJECT":
                return cn(baseClasses, "bg-yellow-500 text-black");
            case "SEMINAR":
                return cn(baseClasses, "bg-red-500 text-white");
            default:
                return cn(baseClasses, "bg-gray-500 text-white");
        }
    }, [classType]);

    const classTypeBadgeLabel: string = useMemo(() => {
        switch (classType) {
            case "LECTURE":
                return t("lecture");
            case "EXERCISES":
                return t("exercises");
            case "LABORATORY":
                return t("laboratory");
            case "COMPUTER_LABORATORY":
                return t("computerLaboratory");
            case "PROJECT":
                return t("project");
            case "SEMINAR":
                return t("seminar");
            default:
                return t("other");
        }
    }, [classType, t]);

    return (
        <span className={classTypeBadgeClasses}>
            {classTypeBadgeLabel.toUpperCase()}
        </span>
    );
}
