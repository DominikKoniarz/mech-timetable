import { useTranslations } from "next-intl";

export default function TableHead() {
    const t = useTranslations("mainPage.table.tableHead");

    const dniTygodnia: string[] = [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday"),
    ];

    return (
        <thead className="bg-background">
            <tr>
                <th
                    scope="col"
                    className="text-foreground w-32 px-4 py-2 text-xs font-medium tracking-wider uppercase"
                >
                    {/* sticky top-0 z-10 */}
                    {t("hour")}
                </th>
                {dniTygodnia.map((day, index) => (
                    <th
                        key={index}
                        scope="col"
                        className="text-foreground px-4 py-2 text-xs font-medium tracking-wider uppercase"
                    >
                        {day}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
