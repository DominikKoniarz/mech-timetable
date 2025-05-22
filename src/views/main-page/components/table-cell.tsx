"use client";

import type { ClassEntry } from "@/types/classes";
import { MdOutlinePlace, MdOutlineClass } from "react-icons/md";
import ClassTypeBadge from "./class-type-badge";
import useClassEntry from "../hooks/use-class-entry";

type Props = {
    classEntries: ClassEntry[];
};

export default function TableCell({ classEntries }: Props) {
    const { foundClassEntry } = useClassEntry(classEntries);

    return (
        // lg:px-4
        <td className="px-2 py-2">
            <div className="bg-card relative flex h-24 flex-col items-center justify-center gap-2 rounded-lg">
                {foundClassEntry && (
                    <>
                        <ClassTypeBadge classType={foundClassEntry.classType} />
                        <div className="flex flex-row items-center gap-1 text-base">
                            <MdOutlineClass className="text-lg lg:text-xl" />{" "}
                            {foundClassEntry.subject}
                        </div>
                        <div className="flex flex-row items-center gap-1 text-base">
                            <MdOutlinePlace className="text-lg lg:text-xl" />{" "}
                            {foundClassEntry.room}
                        </div>
                    </>
                )}
            </div>
        </td>
    );
}
