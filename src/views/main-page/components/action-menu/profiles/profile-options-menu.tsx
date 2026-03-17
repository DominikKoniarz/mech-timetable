import { Pencil, Trash2 } from "lucide-react";
import { ViewTransition } from "react";

export default function ProfileOptionsMenu() {
    return (
        <ViewTransition default="options-menu">
            <div className="grid h-8 w-full grid-cols-2 overflow-hidden rounded-sm">
                <div className="flex h-full w-full items-center justify-center gap-1 border-r border-r-black text-center text-sm text-black">
                    button <Pencil className="size-3.5" />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-1 text-center text-sm text-black">
                    button <Trash2 className="size-3.5" />
                </div>
            </div>
        </ViewTransition>
    );
}
