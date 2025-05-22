import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import ChangeLanguageButton from "./change-language-button";
import FlagPL from "./svg/flag-pl";
import FlagUSA from "./svg/flag-usa";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export function LanguageChange() {
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

export default function SettingsDialog({ className }: Props) {
    const t = useTranslations("settingsDialog");

    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    "text-foreground h-fit w-fit cursor-pointer bg-transparent hover:bg-transparent",
                    className,
                )}
            >
                <Settings className="size-6" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        {t("settings")}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {t("settings")}
                    </DialogDescription>
                    <LanguageChange />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
