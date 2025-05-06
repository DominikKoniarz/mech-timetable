import { useTranslations } from "next-intl";

export default function WelcomeCTA() {
    const t = useTranslations("welcomePage.cta");

    return (
        <div className="h-fit w-fit px-6 text-center">
            <h1 className="xs:text-3xl mx-auto w-fit text-2xl font-bold md:text-4xl">
                {t("h1")}
            </h1>
            <p className="mx-auto mt-4 w-fit text-sm font-light md:text-base">
                {t("text")}
            </p>
        </div>
    );
}
