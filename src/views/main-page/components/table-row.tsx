import type { TableRow } from "@/types/table-rows";
import TableCell from "./table-cell";

type Props = {
	row: TableRow;
};

export default function TableRow({ row }: Props) {
	return (
		<tr>
			<td className="w-32 px-4 py-2 text-sm text-foreground">
				{row.timeEntry.start} - {row.timeEntry.end}
			</td>
			{row.availableClasses.map((classEntries, cellIndex) => (
				<TableCell key={cellIndex} classEntries={classEntries} />
			))}
		</tr>
	);
}
