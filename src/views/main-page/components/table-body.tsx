import type { TableRow as TableRowType } from "@/types/table-rows";
import TableRow from "./table-row";

type Props = {
	rows: TableRowType[];
};

export default function TableBody({ rows }: Props) {
	return (
		<tbody className="bg-background divide-y divide-border">
			{rows.map((row, rowIndex) => (
				<TableRow key={`row-${rowIndex}`} row={row} />
			))}
		</tbody>
	);
}
