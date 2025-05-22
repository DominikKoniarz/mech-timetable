"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "../ui/button";
import { useTranslations } from "next-intl";
import { MonitorCog, Moon, Sun } from "lucide-react";

function ThemeButton({
    children,
    themeToSet,
}: {
    children: React.ReactNode;
    themeToSet: "system" | "light" | "dark";
}) {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            type="button"
            className={cn(
                buttonVariants({
                    variant: theme === themeToSet ? "secondary" : "outline",
                }),
                "text-foreground flex h-10 w-11 cursor-pointer items-center justify-center p-0 has-[>svg]:px-0 [&>svg]:!size-4.5",
            )}
            onClick={() => setTheme(themeToSet)}
        >
            {children}
        </Button>
    );
}

export default function ThemeChange() {
    const t = useTranslations("settingsDialog");

    return (
        <div className="flex flex-col gap-1">
            <h3 className="mt-3 text-left text-sm">{t("changeTheme")}</h3>
            <div className="mt-0.5 flex flex-row gap-2">
                <ThemeButton themeToSet="system">
                    <MonitorCog />
                </ThemeButton>
                <ThemeButton themeToSet="light">
                    <Sun />
                </ThemeButton>
                <ThemeButton themeToSet="dark">
                    <Moon />
                </ThemeButton>
            </div>
        </div>
    );
}
