import type { TableRow as TableRowType } from "@/types/table-rows";
import MobileTableRow from "@/views/main-page/components/mobile/mobile-table-row";

type Props = {
    rows: TableRowType[];
    selectedDay: number;
};

export default function MobileTableBody({ rows, selectedDay }: Props) {
    return (
        <tbody className="bg-background">
            {rows.map((row, rowIndex) => (
                <MobileTableRow
                    key={`mobile-row-${rowIndex}`}
                    row={row}
                    selectedDay={selectedDay}
                />
            ))}
        </tbody>
    );
}
