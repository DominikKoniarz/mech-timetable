import type { TableRow } from "@/types/table-rows";
import { MdOutlinePlace, MdOutlineClass } from "react-icons/md";
import { useTranslations } from "next-intl";
import useMobileTableRow from "../../hooks/use-mobile-table-row";
import ClassTypeBadge from "../class-type-badge";

type Props = {
    row: TableRow;
    selectedDay: number;
};

export default function MobileTableRow({ row, selectedDay }: Props) {
    const t = useTranslations("mainPage.table");

    const { foundClassEntry } = useMobileTableRow({ row, selectedDay });

    return (
        <tr className="border-b last:border-b-0">
            <td className="text-foreground w-20 border-r px-2 py-3 text-sm whitespace-nowrap">
                <div className="flex flex-col items-center">
                    <span>{row.timeEntry.start}</span>
                    <span className="text-muted-foreground text-xs">
                        {t("hours.to")}
                    </span>
                    <span>{row.timeEntry.end}</span>
                </div>
            </td>
            <td className="px-2 py-3">
                <div className="bg-card relative flex h-24 flex-col items-center justify-center gap-1.5 rounded-lg p-1">
                    {foundClassEntry && (
                        <>
                            <ClassTypeBadge
                                classType={foundClassEntry.classType}
                            />
                            <div className="flex flex-row items-center gap-1 text-center text-sm sm:text-base">
                                <MdOutlineClass className="flex-shrink-0 text-lg" />
                                <span className="line-clamp-2">
                                    {foundClassEntry.subject}
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1 text-sm">
                                <MdOutlinePlace className="flex-shrink-0 text-lg" />
                                <span>{foundClassEntry.room}</span>
                            </div>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
