import { useTranslations } from "next-intl";
import ChangeLanguageButton from "./change-language-button";
import FlagPL from "../svg/flag-pl";
import FlagUSA from "../svg/flag-usa";

export default function LanguageChange() {
    const t = useTranslations("settingsDialog");

    return (
        <div className="flex flex-col gap-1">
            <h3 className="mt-3 text-left text-sm">{t("changeLanguage")}</h3>
            <div className="mt-0.5 flex flex-row gap-2">
                <ChangeLanguageButton localeToSet="pl">
                    <FlagPL />
                </ChangeLanguageButton>
                <ChangeLanguageButton localeToSet="en">
                    <FlagUSA />
                </ChangeLanguageButton>
            </div>
        </div>
    );
}
