import type { TableRow } from "@/types/table-rows";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useExportIcsDialog from "@/views/main-page/hooks/use-export-ics-dialog";

type Props = {
    rows: TableRow[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function ExportIcsDialog({ rows, open, onOpenChange }: Props) {
    const t = useTranslations("exportIcsDialog");

    const { handleExport } = useExportIcsDialog(rows);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleExport}
                        className="bg-foreground text-background hover:bg-foreground cursor-pointer rounded-sm px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                    >
                        {t("export")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
