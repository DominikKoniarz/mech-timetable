"use client";

import type { PreferencesSchema } from "@/schema/preferences-schema";
import { parseDepartmentsList } from "@/lib/data/parser";
import { Form } from "@/components/ui/form";
import WelcomeSelects from "./welcome-selects";
import SubmitButton from "./submit-button";
import useWelcomeForm from "../hooks/use-welcome-form";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/env";
import { use } from "react";

type Props = {
    departmentsHtmlPromise: Promise<string>;
    userPreferencesPromise: Promise<PreferencesSchema | null>;
};

export default function WelcomeForm({
    departmentsHtmlPromise,
    userPreferencesPromise,
}: Props) {
    const departmentsHtml = use(departmentsHtmlPromise);
    const userPreferences = use(userPreferencesPromise);

    const departments = parseDepartmentsList(departmentsHtml);

    const { form, onSubmit, isPending, reCaptchaRef } = useWelcomeForm(
        departments,
        userPreferences,
    );

    return (
        <form className="mt-10 w-fit space-y-4" onSubmit={onSubmit}>
            <Form {...form}>
                <ReCAPTCHA
                    className="hidden"
                    size="invisible"
                    sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    ref={reCaptchaRef}
                />
                <WelcomeSelects departments={departments} />
                <SubmitButton isPending={isPending} />
            </Form>
        </form>
    );
}
