import clsx from "clsx";
import { useCalculator } from "../context/CalculatorContext";

interface DisplayProps extends React.ComponentProps<"header"> {}

export default function Display({ className, ...rest }: DisplayProps) {
    const { expression } = useCalculator();

    return (
        <header
            className={clsx(
                "flex min-h-[8rem] items-center justify-end overflow-x-auto px-8 py-6",
                "text-5xl text-neutral-50",
                className
            )}
            {...rest}
        >
            <output
                aria-live="polite"
                aria-atomic="true"
                className="text-nowrap font-mono tracking-tight"
            >
                {expression ? expression : "0"}
            </output>
        </header>
    );
}