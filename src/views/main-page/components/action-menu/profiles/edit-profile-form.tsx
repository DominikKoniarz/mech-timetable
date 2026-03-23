import type { ProfilePreferencesSchema } from "@/schema/preferences-schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import AddProfileSelects from "./add-profile-selects";
import useEditProfileFormReset from "@/views/main-page/hooks/use-edit-profile-form-reset";
import useFetchDepartmentGroups from "@/hooks/use-fetch-department-groups";
import useEditProfileForm from "@/views/main-page/hooks/use-edit-profile-form";
import useFetchDepartments from "@/views/main-page/hooks/use-fetch-departments";
import { useTranslations } from "next-intl";

type Props = {
    open: boolean;
    updateOpen: (open: boolean) => void;
    profilePendingEditIndex: number;
    profile: ProfilePreferencesSchema;
};

export default function EditProfileForm({
    open,
    updateOpen,
    profilePendingEditIndex,
    profile,
}: Props) {
    const t = useTranslations("editProfileDialog");

    const { departments, isLoading: isDepartmentsLoading } =
        useFetchDepartments(open);

    const { form, onSubmit, selectedDepartmentName } = useEditProfileForm({
        departments,
        profileIndex: profilePendingEditIndex,
        profile,
        onSuccess: () => {
            updateOpen(false);
        },
    });

    const {
        groupsByFirstLetter,
        isLoading: isLoadingGroups,
        isError: isGroupsError,
        refetch: refetchGroups,
    } = useFetchDepartmentGroups(selectedDepartmentName || null);

    useEditProfileFormReset({
        dialogOpen: open,
        form,
        groupsByFirstLetter,
        isLoadingGroups,
        selectedDepartmentName: selectedDepartmentName || "",
        initialProfile: profile,
    });

    const hasSelectedDepartment = Boolean(
        selectedDepartmentName && selectedDepartmentName.length > 0,
    );

    const canSubmit =
        hasSelectedDepartment && !isLoadingGroups && !isGroupsError;

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="profileName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("profileName")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("profileNamePlaceholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isDepartmentsLoading ? (
                    <div className="flex animate-pulse flex-col gap-2">
                        <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                        <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                    </div>
                ) : (
                    // TODO: fix groups being empty after second open
                    // make AddProfileSelects reusable for both add and edit profile dialogs
                    <AddProfileSelects
                        departments={departments}
                        parsedGroups={groupsByFirstLetter}
                        dialogNamespace="editProfileDialog"
                    />
                )}
                {hasSelectedDepartment && isLoadingGroups && (
                    <div className="flex flex-col gap-4">
                        <div className="flex animate-pulse flex-col gap-2">
                            <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                            <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                        </div>
                        <div className="flex animate-pulse flex-col gap-2">
                            <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                            <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                        </div>
                        <div className="flex animate-pulse flex-col gap-2">
                            <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                            <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                        </div>
                    </div>
                )}
                {hasSelectedDepartment && isGroupsError && (
                    <div className="flex flex-col items-center gap-3 py-2">
                        <p className="text-muted-foreground text-sm">
                            {t("fetchGroupsError")}
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => refetchGroups()}
                        >
                            {t("retry")}
                        </Button>
                    </div>
                )}
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="bg-foreground text-background hover:bg-foreground cursor-pointer rounded-sm px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                    >
                        {t("submit")}
                    </Button>
                </DialogFooter>
            </Form>
        </form>
    );
}
