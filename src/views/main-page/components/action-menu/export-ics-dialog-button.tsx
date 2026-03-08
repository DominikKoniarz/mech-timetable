import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import { useTranslations } from "next-intl";

type Props = {
    onClick: () => void;
    disabled: boolean;
};

export default function ExportIcsDialogButton({ onClick, disabled }: Props) {
    const t = useTranslations("exportIcsDialog");

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
