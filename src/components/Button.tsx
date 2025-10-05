import clsx from "clsx"

interface ButtonProps extends React.ComponentProps<"button"> {
    text: string
    value: number | string
    onPress: (value: string) => void
    kind: "digit" | "operator" | "clear" | "evalutate" | "period" | "operator-alternative"
}

function Button({ children, text, value, onPress, className, kind, ...rest }: ButtonProps) {
    return (
        <button className={
            clsx("rounded-2xl text-2xl",
                "hover:shadow-lg ",
                "transition-all duration-300",
                "shadow-sm",
                kind === "digit" && "bg-neutral-800 hover:bg-neutral-700 shadow-2xl text-neutral-50 hover:shadow-2xl focus:rounded-4xl",
                kind === "period" && "bg-gray-600/95 text-neutral-50",
                kind === "clear" && "bg-red-500 text-neutral-50 text-xl font-bold",
                kind === "evalutate" && " bg-green-400 hover:bg-green-500 text-neutral-950 hover:text-neutral-50",
                kind === "operator" && " bg-orange-400/80 text-neutral-700 text-xl font-bold",
                kind === "operator-alternative" && "bg-neutral-400 text-neutral-700 text-xl font-bold",
                className
            )
        }
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
