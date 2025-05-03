import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa6";
import { Link } from "@/i18n/routing";

export default function MainPageHeader() {
    const t = useTranslations("mainPage.header");

    return (
        <header className="bg-background border-border relative flex h-14 w-full items-center border-b">
            <Link
                href="/welcome"
                className="bg-foreground text-background absolute left-3 m-0 block cursor-pointer rounded-sm p-1 px-2 py-1 text-sm font-medium"
            >
                {t("changeGroup")}
            </Link>
            <Link
                // @ts-expect-error github link
                href="https://github.com/DominikKoniarz/mech-timetable"
                target="_blank"
                className="absolute left-1/2 mx-auto -translate-x-1/2 text-2xl"
            >
                <FaGithub className="text-foreground" />
            </Link>
        </header>
    );
}
