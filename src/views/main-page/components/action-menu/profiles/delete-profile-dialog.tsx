"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useDeleteProfileDialog from "@/views/main-page/hooks/use-delete-profile-dialog";
import { useTranslations } from "next-intl";

export default function DeleteProfileDialog() {
    const t = useTranslations("deleteProfileDialog");

    const {
        deleteProfileDialogOpen,
        pendingProfile,
        isLastProfile,
        confirmDelete,
        cancelDelete,
    } = useDeleteProfileDialog();

    return (
        <Dialog open={deleteProfileDialogOpen} onOpenChange={cancelDelete}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>
                        {t("description", {
                            profileName: pendingProfile?.name ?? "",
                        })}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={cancelDelete}
                        className="cursor-pointer"
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={confirmDelete}
                        disabled={isLastProfile}
                        className="cursor-pointer"
                    >
                        {t("remove")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
