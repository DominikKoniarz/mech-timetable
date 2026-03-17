import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";
import { useTranslations } from "next-intl";

type Props = {
    disabled: boolean;
};

export default function ExportIcsDialogButton({ disabled }: Props) {
    const t = useTranslations("exportIcsDialog");

    const openExportIcsDialog = useActionsMenuStore(
        (state) => state.openExportIcsDialog,
    );

    const onClick = () => {
        if (disabled) return;

        openExportIcsDialog();
    };

    return (
        <ActionMenuButton
            aria-label={t("title")}
            onClick={onClick}
            disabled={disabled}
        >
            {t("export")}
        </ActionMenuButton>
    );
}
