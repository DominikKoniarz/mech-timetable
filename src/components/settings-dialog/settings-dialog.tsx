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

export default function SettingsDialog({ className }: Props) {
    const t = useTranslations("settingsDialog");

    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    "h-fit w-fit cursor-pointer bg-transparent text-white hover:bg-transparent",
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
                    <div className="flex flex-col gap-1">
                        <h3 className="mt-2 text-left text-base">
                            {t("changeLanguage")}
                        </h3>
                        <div className="mt-0 flex flex-row gap-2">
                            <ChangeLanguageButton localeToSet="pl">
                                <FlagPL />
                            </ChangeLanguageButton>
                            <ChangeLanguageButton localeToSet="en">
                                <FlagUSA />
                            </ChangeLanguageButton>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
