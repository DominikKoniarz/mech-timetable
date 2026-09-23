"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function SwipeGestureTip() {
    const t = useTranslations("mainPage.table.mobile");
    const [showTip, setShowTip] = useState(false);

    useEffect(() => {
        // Check if the tip has been shown before
        const tipShown = localStorage.getItem("swipeGestureTipShown");

        if (!tipShown) {
            // Show the tip after a short delay
            const timer = setTimeout(() => {
                setShowTip(true);
            }, 750);

            return () => clearTimeout(timer);
        }
    }, []);

    const dismissTip = () => {
        setShowTip(false);
        // Remember that the tip has been shown
        localStorage.setItem("swipeGestureTipShown", "true");
    };

    if (!showTip) return null;

    return (
        <div className="bg-card animate-fade-in fixed bottom-8 left-1/2 z-50 block w-full max-w-[calc(100%-32px)] -translate-x-1/2 transform rounded-lg p-3 shadow-lg min-[440px]:max-w-96 min-[970px]:hidden">
            <Button
                onClick={dismissTip}
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-1"
            >
                <X className="h-4 w-4" />
            </Button>
            <div className="px-2 pt-1 pb-2 text-sm">
                <p className="mb-1 font-medium">{t("gestureTipTitle")}</p>
                <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-xs">
                    <li>{t("gestureTipSwipeHorizontal")}</li>
                    <li>{t("gestureTipTapToggle")}</li>
                </ul>
            </div>
        </div>
    );
}
