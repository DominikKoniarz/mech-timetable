import { useLocale, type Locale } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
    localeToSet: Locale;
    children: React.ReactNode;
};

export default function ChangeLanguageButton({ localeToSet, children }: Props) {
    const locale = useLocale();

    return (
        <Link
            href="/"
            locale={localeToSet}
            className={cn(
                buttonVariants({
                    variant: locale === localeToSet ? "secondary" : "outline",
                }),
                "flex h-10 w-fit items-center justify-center p-0 [&>svg]:!size-4.5",
            )}
        >
            {children}
        </Link>
    );
}
