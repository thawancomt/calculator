import clsx from "clsx";
import { useCalculator } from "../context/expressionContext";

interface DisplayProps extends React.ComponentProps<"input"> {
}



export default function Display({ className, ...rest }: DisplayProps) {

    const { expression } = useCalculator()

    return (
        <div placeholder="0" className={clsx(
            "flex justify-end-safe pr-2 text-5xl text-neutral-50  items-center px-10 overflow-x-auto", className
        )} {...rest}

            aria-label="actual calculation expression to be calculated"
        >

            <p className="text-nowrap" aria-label="expression on display">{expression ? expression : "0"}</p>
        </div>
    )
}