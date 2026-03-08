import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";
import { useMainPageStore } from "@/views/main-page/context/main-page-provider";
import { Check } from "lucide-react";

type Props = {
    profileName: string;
    index: number;
    selected: boolean;
};

export default function ProfileButton({ profileName, index, selected }: Props) {
    const setProfileIndex = useMainPageStore((state) => state.setProfileIndex);

    const handleClick = () => {
        setProfileIndex(index);
    };

    return (
        <ActionMenuButton
            onClick={handleClick}
            // TODO: Add translation
            ariaLabel={`Switch to ${profileName} profile`}
        >
            {profileName}
            {selected && <Check />}
        </ActionMenuButton>
    );
}
