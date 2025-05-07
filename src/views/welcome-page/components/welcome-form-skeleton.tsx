export default function WelcomeFormSkeleton() {
    return (
        <div className="mt-10 flex h-fit w-full max-w-60 flex-col gap-0">
            <div className="flex animate-pulse flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                    <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                    <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                    <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
                    <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
                </div>
            </div>
            <div className="bg-foreground/75 mx-auto mt-6 h-9 w-[68.6px] rounded-sm"></div>
        </div>
    );
}
