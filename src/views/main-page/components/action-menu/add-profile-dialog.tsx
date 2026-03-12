"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import AddProfileSelects from "./add-profile-selects";
import useAddProfileForm from "@/views/main-page/hooks/use-add-profile-form";
import useFetchDepartments from "@/views/main-page/hooks/use-fetch-departments";
import useFetchDepartmentGroups from "@/hooks/use-fetch-department-groups";
import useAddProfileFormReset from "@/views/main-page/hooks/use-add-profile-form-reset";
import { useTranslations } from "next-intl";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function AddProfileDialog({ open, onOpenChange }: Props) {
    const t = useTranslations("addProfileDialog");

    const { departments, isLoading: isDepartmentsLoading } =
        useFetchDepartments(open);

    const { form, onSubmit, selectedDepartmentName } = useAddProfileForm(
        departments,
        onOpenChange,
    );

    const {
        groupsByFirstLetter,
        isLoading: isLoadingGroups,
        isError: isGroupsError,
        refetch: refetchGroups,
    } = useFetchDepartmentGroups(selectedDepartmentName || null);

    useAddProfileFormReset({
        form,
        groupsByFirstLetter,
        isLoadingGroups,
    });

    const hasSelectedDepartment = Boolean(
        selectedDepartmentName && selectedDepartmentName.length > 0,
    );
    const canSubmit =
        hasSelectedDepartment && !isLoadingGroups && !isGroupsError;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>
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
                                            placeholder={t(
                                                "profileNamePlaceholder",
                                            )}
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
                            <AddProfileSelects
                                departments={departments}
                                parsedGroups={groupsByFirstLetter}
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
                        {canSubmit && (
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="bg-foreground text-background hover:bg-foreground cursor-pointer rounded-sm px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                                >
                                    {t("submit")}
                                </Button>
                            </DialogFooter>
                        )}
                    </Form>
                </form>
            </DialogContent>
        </Dialog>
    );
}
