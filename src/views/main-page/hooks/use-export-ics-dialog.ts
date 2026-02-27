import { generateICS } from "@/lib/ics/generate-ics";
import type { TableRow } from "@/types/table-rows";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const useExportIcsDialog = (rows: TableRow[]) => {
    const t = useTranslations("exportIcsDialog");

    const iscTranslations = {
        LECTURE: t("lecture"),
        EXERCISES: t("exercises"),
        LABORATORY: t("laboratory"),
        COMPUTER_LABORATORY: t("computerLaboratory"),
        PROJECT: t("project"),
        SEMINAR: t("seminar"),
        OTHER: t("other"),
    };

    const handleExport = () => {
        const icsContent = generateICS({ rows, translations: iscTranslations });

        if (!icsContent) {
            toast.error(t("exportError"));
            return;
        }

        const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "timetable.ics";
        link.click();

        setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    return {
        handleExport,
    };
};

export default useExportIcsDialog;
