import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
    disabled?: boolean;
    className?: string;
};

export default function ActionMenuButton({
    onClick,
    ariaLabel,
    children,
    className,
    disabled,
}: Props) {
    return (
        <Button
            type="button"
            className={cn(
                "flex h-fit w-full cursor-pointer justify-between rounded-sm px-2 py-1.5 text-left text-sm font-normal transition-colors has-[>svg]:px-2",
                className,
            )}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
