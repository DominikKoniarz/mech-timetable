import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { TableRow } from "@/types/table-rows";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import ExportIcsDialog from "@/views/main-page/components/action-menu/export-ics-dialog";
import useActionsMenu from "@/views/main-page/hooks/use-actions-menu";
import ExportIcsDialogButton from "@/views/main-page/components/action-menu/export-ics-dialog-button";
import { useTranslations } from "next-intl";
import AddProfileDialogButton from "@/views/main-page/components/action-menu/profiles/add-profile-dialog-button";
import AddProfileDialog from "@/views/main-page/components/action-menu/profiles/add-profile-dialog";
import DeleteProfileDialog from "@/views/main-page/components/action-menu/profiles/delete-profile-dialog";
import ProfilesListItem from "@/views/main-page/components/action-menu/profiles/profiles-list-item";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";
import EditProfileDialog from "@/views/main-page/components/action-menu/profiles/edit-profile-dialog";

type Props = {
    rows: TableRow[] | undefined;
    isLoading: boolean;
    preferences: PreferencesSchema;
};

export default function ActionsMenu({ rows, preferences, isLoading }: Props) {
    const t = useTranslations("mainPage.actionMenu");

    const actionsMenuOpen = useActionsMenuStore(
        (state) => state.actionsMenuOpen,
    );
    const updateActionsMenuOpen = useActionsMenuStore(
        (state) => state.updateActionsMenuOpen,
    );

    const { selectedProfile, profileIndex } = useActionsMenu({ preferences });

    if (!selectedProfile) {
        return null;
    }

    return (
        <>
            <Popover
                open={actionsMenuOpen}
                onOpenChange={updateActionsMenuOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="group bg-foreground text-background hover:bg-foreground hover:text-background absolute right-4 bottom-4 z-40 flex h-fit max-w-40 cursor-pointer flex-row gap-0 border-none p-0 text-sm transition-all hover:opacity-90"
                    >
                        <div className="truncate py-1.5 pr-2 pl-3">
                            {selectedProfile.name}
                        </div>
                        <div className="grid place-items-center self-stretch border-l pr-3 pl-2">
                            <ChevronDown className="size-4 transition-transform duration-150 group-data-[state=open]:rotate-180" />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-52 p-0">
                    <MenuSection>
                        <MenuSectionLabel>{t("profiles")}</MenuSectionLabel>
                        {preferences.profiles.map((profile, index) => (
                            <ProfilesListItem
                                key={`${index}-${profile.name}`}
                                profile={profile}
                                index={index}
                                selected={index === profileIndex}
                                profilesCount={preferences.profiles.length}
                            />
                        ))}
                    </MenuSection>
                    <MenuSeparator />
                    <MenuSection>
                        <MenuSectionLabel>{t("actions")}</MenuSectionLabel>
                        <AddProfileDialogButton
                            disabled={preferences.profiles.length >= 3}
                        />
                        <ExportIcsDialogButton disabled={isLoading || !rows} />
                    </MenuSection>
                </PopoverContent>
            </Popover>
            {rows && <ExportIcsDialog rows={rows} />}
            <AddProfileDialog />
            <DeleteProfileDialog />
            <EditProfileDialog />
        </>
    );
}

function MenuSeparator() {
    return <div className="bg-border h-px" aria-hidden />;
}

function MenuSection({ children }: { children: React.ReactNode }) {
    return <div className="space-y-1 p-1.5">{children}</div>;
}

function MenuSectionLabel({ children }: { children: string }) {
    return (
        <p className="text-muted-foreground px-1.5 pt-0.5 pb-1 text-xs font-medium tracking-wide uppercase">
            {children}
        </p>
    );
}
