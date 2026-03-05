"use client";

import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { Department } from "@/types/departments";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import WelcomeSelects from "./welcome-selects";
import SubmitButton from "./submit-button";
import useWelcomeForm from "../hooks/use-welcome-form";
import useFetchDepartments from "../hooks/use-fetch-departments";
import useFetchDepartmentGroups from "../hooks/use-fetch-department-groups";
import {
    WelcomeFormBlankSubmitSkeleton,
    WelcomeFormInputSkeleton,
} from "./welcome-form-skeleton";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/env";
import { useTranslations } from "next-intl";
import useFormReset from "@/views/welcome-page/hooks/use-form-reset";

type Props = {
    userPreferences: PreferencesSchema | null;
};

type LoadedWelcomeFormProps = {
    departments: Department[];
    userPreferences: PreferencesSchema | null;
};

type GroupsFetchErrorProps = {
    message: string;
    retryLabel: string;
    onRetry: () => void;
};

function GroupsFetchError({
    message,
    retryLabel,
    onRetry,
}: GroupsFetchErrorProps) {
    return (
        <div className="flex flex-col items-center gap-3 py-2">
            <p className="text-muted-foreground text-sm">{message}</p>
            <Button type="button" variant="outline" onClick={onRetry}>
                {retryLabel}
            </Button>
        </div>
    );
}

function LoadedWelcomeForm({
    departments,
    userPreferences,
}: LoadedWelcomeFormProps) {
    const t = useTranslations("welcomePage.form");

    const { form, onSubmit, isPending, reCaptchaRef, selectedDepartmentName } =
        useWelcomeForm(departments, userPreferences);

    const {
        groupsByFirstLetter,
        isLoading: isGroupsLoading,
        isError: isGroupsError,
        refetch: refetchGroups,
    } = useFetchDepartmentGroups(selectedDepartmentName || null);

    const hasSelectedDepartment = Boolean(
        selectedDepartmentName && selectedDepartmentName.length > 0,
    );
    const canSubmit =
        hasSelectedDepartment && !isGroupsLoading && !isGroupsError;

    useFormReset(form, groupsByFirstLetter, departments, userPreferences);

    return (
        <form
            className="mt-10 w-fit min-w-62 space-y-4 pb-4 sm:pb-6"
            onSubmit={onSubmit}
        >
            <Form {...form}>
                <ReCAPTCHA
                    className="hidden"
                    size="invisible"
                    sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    ref={reCaptchaRef}
                />
                <WelcomeSelects
                    departments={departments}
                    parsedGroups={groupsByFirstLetter}
                />
                {hasSelectedDepartment && isGroupsLoading && (
                    <>
                        <div className="flex flex-col gap-4">
                            <WelcomeFormInputSkeleton />
                            <WelcomeFormInputSkeleton />
                            <WelcomeFormInputSkeleton />
                        </div>
                        <WelcomeFormBlankSubmitSkeleton />
                    </>
                )}
                {hasSelectedDepartment && isGroupsError && (
                    <GroupsFetchError
                        message={t("fetchGroupsError")}
                        retryLabel={t("retry")}
                        onRetry={refetchGroups}
                    />
                )}
                {canSubmit && <SubmitButton isPending={isPending} />}
            </Form>
        </form>
    );
}

export default function WelcomeForm({ userPreferences }: Props) {
    const { departments } = useFetchDepartments();

    return (
        <LoadedWelcomeForm
            departments={departments}
            userPreferences={userPreferences}
        />
    );
}
