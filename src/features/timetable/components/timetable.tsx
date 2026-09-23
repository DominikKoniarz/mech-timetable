import type { TableRow } from "@/types/table-rows";
import TableHead from "./table-head";
import TableBody from "./table-body";

type Props = {
    rows: TableRow[];
};

export default function Timetable({ rows }: Props) {
    return (
        <table className="relative mt-2 w-full min-w-full table-fixed max-[970]:hidden">
            <TableHead />
            <TableBody rows={rows} />
        </table>
    );
}
