import { Plus } from "lucide-react";
import ActionMenuButton from "@/features/timetable/components/action-menu/action-menu-button";
import { useTranslations } from "next-intl";
import { useActionsMenuStore } from "@/features/timetable/stores/actions-menu-store";

type Props = {
    disabled: boolean;
};

export default function AddProfileDialogButton({ disabled }: Props) {
    const t = useTranslations("addProfileDialog");

    const openAddProfileDialog = useActionsMenuStore(
        (state) => state.openAddProfileDialog,
    );

    const onClick = () => {
        if (disabled) return;

        openAddProfileDialog();
    };

    return (
        <ActionMenuButton
            ariaLabel={t("title")}
            onClick={onClick}
            disabled={disabled}
        >
            {t("title")}
            <Plus />
        </ActionMenuButton>
    );
}
