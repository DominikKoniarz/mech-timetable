import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { Settings } from "lucide-react";

export default function SettingsDialog() {
    return (
        <Dialog>
            <DialogTrigger className="absolute right-3 h-fit w-fit cursor-pointer bg-transparent hover:bg-transparent">
                <Settings className="size-6" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="sr-only">
                        Are you absolutely sure?
                    </DialogTitle>
                    <Link
                        href="/"
                        locale="en"
                        className="h-fit w-fit border p-4"
                    >
                        EN
                    </Link>
                    <Link
                        href="/"
                        locale="pl"
                        className="h-fit w-fit border p-4"
                    >
                        PL
                    </Link>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
