"use client";

import type { PreferencesSchema } from "@/schema/preferences-schema";
import type { Department } from "@/types/departments";
import { Form } from "@/components/ui/form";
import WelcomeSelects from "./welcome-selects";
import SubmitButton from "./submit-button";
import useWelcomeForm from "../hooks/use-welcome-form";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/env";
import { GroupsByFirstLetter } from "@/types/groups";
import { cn } from "@/lib/utils";

type Props = {
    departments: Department[];
    userPreferences: PreferencesSchema | null;
    groupsByFirstLetter: GroupsByFirstLetter | null;
    departmentName: string | undefined;
};

export default function WelcomeForm({
    departments,
    userPreferences,
    groupsByFirstLetter,
    departmentName,
}: Props) {
    const { form, onSubmit, isPending, reCaptchaRef } = useWelcomeForm(
        departments,
        userPreferences,
        groupsByFirstLetter,
        departmentName,
    );

    const selectedDepartmentName = form.watch("departmentName");

    return (
        <form
            className={cn(
                "mt-10 w-fit min-w-62 space-y-4 pb-10 sm:pb-16",
                groupsByFirstLetter && "pb-2 sm:pb-4",
            )}
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
                {selectedDepartmentName.length > 0 && (
                    <SubmitButton isPending={isPending} />
                )}
            </Form>
        </form>
    );
}
