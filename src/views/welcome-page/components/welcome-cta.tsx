import { useTranslations } from "next-intl";

type Props = {
    departmentsAvailable: boolean;
};

export default function WelcomeCTA({ departmentsAvailable }: Props) {
    const t = useTranslations("welcomePage.cta");

    return (
        <div className="h-fit w-fit px-6 text-center">
            <h1 className="xs:text-3xl mx-auto w-fit text-2xl font-bold md:text-4xl">
                {t("h1")}
            </h1>
            {departmentsAvailable && (
                <p className="mx-auto mt-4 w-fit text-sm font-light md:text-base">
                    {t("text")}
                </p>
            )}
        </div>
    );
}
