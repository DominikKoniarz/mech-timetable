import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { TableRow } from "@/types/table-rows";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Plus } from "lucide-react";
import ExportIcsDialog from "@/views/main-page/components/action-menu/export-ics-dialog";
import ProfileButton from "@/views/main-page/components/action-menu/profile-button";
import useActionsMenu from "@/views/main-page/hooks/use-actions-menu";
import ExportIcsDialogButton from "@/views/main-page/components/action-menu/export-ics-dialog-button";
import ActionMenuButton from "@/views/main-page/components/action-menu/action-menu-button";

type Props = {
    rows: TableRow[] | undefined;
    isLoading: boolean;
    preferences: PreferencesSchema;
};

export default function ActionsMenu({ rows, preferences, isLoading }: Props) {
    const {
        popoverOpen,
        setPopoverOpen,
        exportIcsDialogOpen,
        setExportIcsDialogOpen,
        selectedProfile,
        profileIndex,
        openExportIcsDialog,
    } = useActionsMenu({ preferences });

    if (!selectedProfile) {
        return null;
    }

    return (
        <>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="group bg-foreground text-background hover:bg-foreground hover:text-background absolute right-4 bottom-4 z-40 flex h-fit cursor-pointer flex-row gap-0 border-none p-0 text-sm transition-all hover:opacity-90"
                    >
                        <div className="py-1.5 pr-2 pl-3">
                            {selectedProfile.name}
                        </div>
                        <div className="grid place-items-center self-stretch border-l pr-3 pl-2">
                            <ChevronDown className="size-4 transition-transform duration-150 group-data-[state=open]:rotate-180" />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-44 p-0">
                    <MenuSection>
                        <MenuSectionLabel>Profiles</MenuSectionLabel>
                        {preferences.profiles.map((profile, index) => (
                            <ProfileButton
                                key={`${index}-${profile.name}`}
                                profileName={profile.name}
                                index={index}
                                selected={index === profileIndex}
                            />
                        ))}
                    </MenuSection>
                    <MenuSeparator />
                    <MenuSection>
                        <MenuSectionLabel>Actions</MenuSectionLabel>
                        <ActionMenuButton>
                            Add profile
                            <Plus />
                        </ActionMenuButton>
                        <ExportIcsDialogButton
                            onClick={openExportIcsDialog}
                            disabled={isLoading || !rows}
                        />
                    </MenuSection>
                </PopoverContent>
            </Popover>
            {rows && (
                <ExportIcsDialog
                    rows={rows}
                    open={exportIcsDialogOpen}
                    onOpenChange={setExportIcsDialogOpen}
                />
            )}
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
