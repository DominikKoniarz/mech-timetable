"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import {
    startTransition,
    useEffect,
    useEffectEvent,
    useRef,
    useState,
} from "react";
import { useActionsMenuStore } from "@/views/main-page/stores/actions-menu-store";
import useUserPreferences from "@/hooks/use-user-preferences";
import EditProfileForm from "@/views/main-page/components/action-menu/profiles/edit-profile-form";

export default function EditProfileDialog() {
    const [open, setOpen] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const t = useTranslations("editProfileDialog");

    const profilePendingEditIndex = useActionsMenuStore(
        (state) => state.profilePendingEditIndex,
    );
    const updateProfilePendingEditIndex = useActionsMenuStore(
        (state) => state.updateProfilePendingEditIndex,
    );
    const updateActionsMenuOpen = useActionsMenuStore(
        (state) => state.updateActionsMenuOpen,
    );

    const { preferences } = useUserPreferences();

    const updateOpen = (open: boolean) => {
        setOpen(open);

        if (!open) {
            closeTimerRef.current = setTimeout(() => {
                updateProfilePendingEditIndex(null);
            }, 250);
        } else {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);

                closeTimerRef.current = null;
            }

            updateActionsMenuOpen(false);
        }
    };

    const handleProfilePendingEditIndexChange = useEffectEvent(
        (profilePendingEditIndex: number | null) => {
            if (profilePendingEditIndex === null && open) {
                startTransition(() => {
                    setOpen(false);
                });
            } else if (profilePendingEditIndex !== null && !open) {
                startTransition(() => {
                    setOpen(true);

                    if (closeTimerRef.current) {
                        clearTimeout(closeTimerRef.current);

                        closeTimerRef.current = null;
                    }
                });

                updateActionsMenuOpen(false);
            }
        },
    );

    useEffect(() => {
        handleProfilePendingEditIndexChange(profilePendingEditIndex);
    }, [profilePendingEditIndex]);

    if (profilePendingEditIndex === null) {
        return null;
    }

    const profile = preferences?.profiles.at(profilePendingEditIndex);

    if (!profile) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={updateOpen}>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>
                <EditProfileForm
                    open={open}
                    updateOpen={updateOpen}
                    profilePendingEditIndex={profilePendingEditIndex}
                    profile={profile}
                />
            </DialogContent>
        </Dialog>
    );
}
