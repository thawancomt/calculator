import clsx from "clsx"

interface ButtonProps extends React.ComponentProps<"button"> {
    text: string
    value: number | string
    onPress: (value: string) => void
    kind: "digit" | "operator" | "clear" | "evalutate" | "period" | "operator-alternative"
}

function Button({ children, text, value, onPress, className, kind, ...rest }: ButtonProps) {
    return (
        <button
            className={clsx(
                "rounded-2xl text-2xl font-semibold transition-all duration-200",
                "shadow-lg hover:shadow-md focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-blue-500 focus-visible:outline-offset-2",
                kind === "digit" && "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 rounded-2xl hover:rounded-[50px]",
                kind === "period" && "bg-neutral-700 text-neutral-50 hover:bg-neutral-600",
                kind === "clear" && "bg-red-500 text-neutral-50 hover:bg-red-600",
                kind === "evalutate" && "bg-emerald-400 text-neutral-900 hover:bg-emerald-500",
                kind === "operator" && "bg-amber-400/90 text-neutral-800 hover:bg-amber-400",
                kind === "operator-alternative" && "bg-neutral-300 text-neutral-700 hover:bg-neutral-200 border border-neutral-500",
                className
            )}
            onClick={() => {
                onPress(text)
            }}
            {...rest}
        >
            {value}
        </button>
    )
}

export default Button
