import type { TableRow } from "@/types/table-rows";
import Timetable from "./components/timetable";

type Props = {
	rows: TableRow[];
};

export default function MainPageView({ rows }: Props) {
	return (
		<main className="overflow-x-auto">
			<Timetable rows={rows} />
		</main>
	);
}
