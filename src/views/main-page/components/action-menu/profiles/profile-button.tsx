import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ViewTransition } from "react";

type Props = {
    profileName: string;
    selected: boolean;
    handleClick: () => void;
};

export default function ProfileButton({
    profileName,
    selected,
    handleClick,
}: Props) {
    const t = useTranslations("mainPage.actionMenu");

    return (
        <ViewTransition default="profile-button">
            <ActionMenuButton
                className="w-full shrink-1 pr-1.5"
                onClick={handleClick}
                ariaLabel={t("switchProfileAriaLabel", { profileName })}
            >
                <span className="truncate">{profileName} </span>
                <div className="flex w-fit items-center justify-end gap-2">
                    {selected && <Check />}
                </div>
            </ActionMenuButton>
        </ViewTransition>
    );
}
