import type { TableRow } from "@/types/table-rows";
import TableHead from "./table-head";
import TableBody from "./table-body";

type Props = {
    rows: TableRow[];
};

export default function Timetable({ rows }: Props) {
    return (
        <table className="relative hidden w-full min-w-full table-fixed lg:table">
            <TableHead />
            <TableBody rows={rows} />
        </table>
    );
}
