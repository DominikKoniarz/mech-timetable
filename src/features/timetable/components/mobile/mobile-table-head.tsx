import { useTranslations } from "next-intl";

type Props = {
    day: string;
};

export default function MobileTableHead({ day }: Props) {
    const t = useTranslations("mainPage.table.tableHead");

    return (
        <thead className="bg-background">
            <tr className="border-b">
                <th
                    scope="col"
                    className="text-foreground w-20 border-r px-3 py-3 text-left text-xs font-medium tracking-wider uppercase"
                >
                    {t("hour")}
                </th>
                <th
                    scope="col"
                    className="text-foreground px-3 py-3 text-center text-xs font-medium tracking-wider uppercase"
                >
                    {day}
                </th>
            </tr>
        </thead>
    );
}
