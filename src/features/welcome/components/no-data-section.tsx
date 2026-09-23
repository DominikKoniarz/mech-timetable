import { useTranslations } from "next-intl";

export default function NoDataSection() {
    const t = useTranslations("welcomePage.noDataSection");

    return (
        <h1 className="mx-auto mt-4 w-fit max-w-120 px-4 text-center text-lg font-bold md:mt-8">
            {t("text")}
        </h1>
    );
}
