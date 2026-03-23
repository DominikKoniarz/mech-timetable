import { Pencil, Trash2 } from "lucide-react";
import { ViewTransition } from "react";
import { useTranslations } from "next-intl";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";
import { Button } from "@/components/ui/button";

type Props = {
    profileIndex: number;
    profileName: string;
    profilesCount: number;
    onEditClick: () => void;
};

export default function ProfileOptionsMenu({
    profileIndex,
    profileName,
    profilesCount,
    onEditClick,
}: Props) {
    const t = useTranslations("mainPage.actionMenu");

    const openDeleteProfileDialog = useActionsMenuStore(
        (state) => state.openDeleteProfileDialog,
    );

    const isLastProfile = profilesCount <= 1;

    const handleDeleteClick = () => {
        if (isLastProfile) {
            return;
        }

        openDeleteProfileDialog(profileIndex);
    };

    return (
        <ViewTransition default="options-menu">
            <div className="grid h-8 w-full grid-cols-2 overflow-hidden rounded-sm">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onEditClick}
                    className="h-full w-full cursor-pointer justify-center gap-1 rounded-none border-r border-r-black px-2 py-1.5 text-center text-sm font-normal text-black shadow-none transition-colors hover:bg-black/5 hover:text-black has-[>svg]:px-2"
                    aria-label={t("editProfileAriaLabel", { profileName })}
                >
                    {t("edit")}
                    <Pencil className="size-3.5" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleDeleteClick}
                    disabled={isLastProfile}
                    title={
                        isLastProfile ? t("cannotDeleteLastProfile") : undefined
                    }
                    className="h-full w-full cursor-pointer justify-center gap-1 rounded-none px-2 py-1.5 text-center text-sm font-normal text-black shadow-none transition-colors hover:bg-black/5 hover:text-black disabled:opacity-60 has-[>svg]:px-2"
                    aria-label={t("deleteProfileAriaLabel", { profileName })}
                >
                    {t("delete")}
                    <Trash2 className="size-3.5" />
                </Button>
            </div>
        </ViewTransition>
    );
}
