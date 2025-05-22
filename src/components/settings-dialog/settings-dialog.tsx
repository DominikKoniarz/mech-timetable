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
import { cn } from "@/lib/utils";
import LanguageChange from "./language-change/language-change";
import ThemeChange from "./theme-change";

type Props = {
    className?: string;
};

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
                    <ThemeChange />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
