"use client";

import type { TableRow } from "@/types/table-rows";
import { CalendarArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useExportIcsDialog from "../hooks/use-export-ics-dialog";

type Props = {
    rows: TableRow[];
};

export default function ExportIcsDialog({ rows }: Props) {
    const t = useTranslations("exportIcsDialog");

    const { handleExport } = useExportIcsDialog(rows);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    className="bg-foreground text-background fixed right-4 bottom-4 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full shadow-lg transition-opacity hover:bg-foreground hover:opacity-90"
                    aria-label={t("title")}
                >
                    <CalendarArrowDown className="size-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleExport}
                        className="bg-foreground text-background cursor-pointer rounded-sm px-4 py-2 text-sm font-medium transition-opacity hover:bg-foreground hover:opacity-90"
                    >
                        {t("exportButton")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
