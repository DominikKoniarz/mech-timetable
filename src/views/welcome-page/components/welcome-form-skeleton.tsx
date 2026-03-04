export function WelcomeFormInputSkeleton() {
    return (
        <div className="flex animate-pulse flex-col gap-2">
            <div className="bg-foreground/75 h-3.5 w-1/3 rounded-sm"></div>
            <div className="bg-foreground/75 h-9 w-full rounded-sm"></div>
        </div>
    );
}

export function WelcomeFormBlankSubmitSkeleton() {
    return (
        <div className="mx-auto mt-6 h-9 w-[68.6px] rounded-sm bg-transparent"></div>
    );
}

export default function WelcomeFormSkeleton() {
    return (
        <div className="mt-10 w-fit min-w-62 space-y-4 pb-4 sm:pb-6">
            <div className="flex flex-col gap-4">
                <WelcomeFormInputSkeleton />
                <WelcomeFormInputSkeleton />
                <WelcomeFormInputSkeleton />
                <WelcomeFormInputSkeleton />
            </div>
            <WelcomeFormBlankSubmitSkeleton />
        </div>
    );
}
