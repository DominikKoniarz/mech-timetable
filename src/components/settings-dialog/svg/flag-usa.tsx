type Props = {
    className?: string;
};

export default function FlagUSA({ className }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="flag-icons-us"
            viewBox="0 0 640 480"
            className={className}
        >
            <path fill="#bd3d44" d="M0 0h640v480H0" />
            <path
                stroke="#fff"
                strokeWidth="37"
                d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
            />
            <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
            <defs>
                <pattern
                    id="us-stars"
                    width="30"
                    height="30"
                    patternUnits="userSpaceOnUse"
                >
                    <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z" />
                </pattern>
            </defs>
            <path
                fill="url(#us-stars)"
                d="M16 11h304v26H16m0 26h304v26H16m0 26h304v26H16m0 26h304v26H16m0 26h304v26H16m0 26h304v26H16"
            />
        </svg>
    );
}
