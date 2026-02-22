"use client";

import type { TableRow } from "@/types/table-rows";
import { CalendarArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { generateICS } from "@/lib/ics/generate-ics";

type Props = {
    rows: TableRow[];
};

export default function ExportIcsDialog({ rows }: Props) {
    const t = useTranslations("exportIcsDialog");

    const handleExport = () => {
        const icsContent = generateICS(rows);
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-foreground text-background fixed right-4 bottom-4 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full shadow-lg transition-opacity hover:opacity-90"
                    aria-label={t("title")}
                >
                    <CalendarArrowDown className="size-5" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <button
                        onClick={handleExport}
                        className="bg-foreground text-background cursor-pointer rounded-sm px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                    >
                        {t("exportButton")}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
