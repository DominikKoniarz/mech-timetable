import { Plus } from "lucide-react";
import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import { useTranslations } from "next-intl";

type Props = {
    onClick: () => void;
    disabled: boolean;
};

export default function AddProfileDialogButton({ onClick, disabled }: Props) {
    const t = useTranslations("addProfileDialog");

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
