import { cn } from "@/lib/utils";
import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    profileName: string;
    index: number;
    selected: boolean;
};

export default function ProfileButton({ profileName, index, selected }: Props) {
    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);
    const t = useTranslations("mainPage.actionMenu");

    const handleClick = () => {
        setProfileIndex(index);
    };

    return (
        <ActionMenuButton
            onClick={handleClick}
            className={cn(!selected && "pr-8")} // pr-8 mimicks the check icon size
            ariaLabel={t("switchProfileAriaLabel", { profileName })}
        >
            <span className="truncate">{profileName}</span>
            {selected && <Check />}
        </ActionMenuButton>
    );
}
