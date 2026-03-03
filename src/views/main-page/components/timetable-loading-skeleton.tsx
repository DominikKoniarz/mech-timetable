type DesktopTimetableLoadingSkeletonProps = {
    columns: number[];
    rows: number[];
};

function DesktopTimetableLoadingSkeleton({
    columns,
    rows,
}: DesktopTimetableLoadingSkeletonProps) {
    return (
        <table className="relative mt-2 w-full min-w-full table-fixed max-[970]:hidden">
            <thead className="bg-background">
                <tr>
                    <th className="w-32 px-4 py-2">
                        <div className="bg-muted mx-auto h-10 w-20 animate-pulse rounded-md" />
                    </th>
                    {columns.map((_, index) => (
                        <th key={`desktop-head-${index}`} className="px-4 py-2">
                            <div className="bg-muted mx-auto h-4 w-20 animate-pulse rounded-md" />
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="bg-background divide-border divide-y">
                {rows.map((_, rowIndex) => (
                    <tr key={`desktop-row-${rowIndex}`}>
                        <td className="w-32 px-4 py-2">
                            <div className="bg-muted h-5 w-24 animate-pulse rounded-md" />
                        </td>
                        {columns.map((_, columnIndex) => (
                            <td
                                key={`desktop-cell-${rowIndex}-${columnIndex}`}
                                className="px-2 py-2"
                            >
                                <div className="bg-card flex h-24 items-center justify-center rounded-lg">
                                    <div className="bg-muted h-16 w-[80%] animate-pulse rounded-md" />
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

type MobileTimetableLoadingSkeletonProps = {
    columns: number[];
    rows: number[];
};

function MobileTimetableLoadingSkeleton({
    columns,
    rows,
}: MobileTimetableLoadingSkeletonProps) {
    return (
        <div className="flex h-full w-full flex-col min-[970px]:hidden">
            <div className="bg-card sticky top-0 z-10 flex h-20 w-full items-center justify-between overflow-hidden shadow-sm">
                <div className="bg-muted mx-2 h-8 w-8 animate-pulse rounded-md" />

                <div className="flex flex-1 flex-col items-center justify-center gap-2 py-3">
                    <div className="bg-muted h-4 w-28 animate-pulse rounded-md" />
                    <div className="bg-muted h-3 w-20 animate-pulse rounded-md" />
                    <div className="flex gap-1.5">
                        {columns.map((_, index) => (
                            <div
                                key={`mobile-dot-${index}`}
                                className="bg-muted h-1.5 w-1.5 animate-pulse rounded-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-muted mx-2 h-8 w-8 animate-pulse rounded-md" />
            </div>

            {/* overflow-hidden to prevent the table from being scrollable */}
            <div className="flex-1 overflow-hidden rounded-lg shadow-sm">
                <table className="mt-2 w-full table-fixed border-collapse">
                    <thead className="bg-background">
                        <tr className="border-b">
                            <th className="w-20 border-r px-3 py-3">
                                <div className="bg-muted h-4 w-10 animate-pulse rounded-md" />
                            </th>
                            <th className="px-3 py-3">
                                <div className="bg-muted mx-auto h-4 w-20 animate-pulse rounded-md" />
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-background">
                        {rows.map((_, rowIndex) => (
                            <tr
                                key={`mobile-row-${rowIndex}`}
                                className="border-b last:border-b-0"
                            >
                                <td className="w-20 border-r px-2 py-3">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="bg-muted h-4 w-10 animate-pulse rounded-md" />
                                        <div className="bg-muted h-3 w-6 animate-pulse rounded-md" />
                                        <div className="bg-muted h-4 w-10 animate-pulse rounded-md" />
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <div className="bg-card flex h-24 items-center justify-center rounded-lg p-1">
                                        <div className="bg-muted h-16 w-[80%] animate-pulse rounded-md" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function TimetableLoadingSkeleton() {
    const columns = Array.from({ length: 5 }, (_, index) => index);
    const desktopRows = Array.from({ length: 8 }, (_, index) => index);
    const mobileRows = Array.from({ length: 8 }, (_, index) => index);

    return (
        <>
            <DesktopTimetableLoadingSkeleton
                columns={columns}
                rows={desktopRows}
            />
            <MobileTimetableLoadingSkeleton
                columns={columns}
                rows={mobileRows}
            />
        </>
    );
}
