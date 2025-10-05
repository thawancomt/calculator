import clsx from "clsx";
import { ArrowUpFromLine, Calculator, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useCalculator } from "../context/expressionContext";

interface HistoryProps extends React.ComponentProps<"section"> { }

export default function History({ className, ...rest }: HistoryProps) {
    const { history, setExpression } = useCalculator();
    const [isOpen, setIsOpen] = useState(false);

    const listId = "history-list";

    function toggleHistory() {
        setIsOpen((v) => !v);
    }

    const items = useMemo(
        () =>
            history.map((it) => ({
                ...it,
                key: `${it.expression}=${it.result}`, // idealmente use um id único real
            })),
        [history]
    );

    return (
        <section
            aria-labelledby="history-title"
            className={clsx(
                "flex flex-col items-end  m-4 p-2  bg-neutral-300 rounded-xl ",
                className
            )}
            {...rest}
        >
            <button
                type="button"
                onClick={toggleHistory}
                className={clsx(
                    "shadow-md bg-white px-4 py-3 flex items-center gap-2 rounded-2xl",
                    "hover:shadow-lg transition-shadow font-semibold text-neutral-700",
                    "border border-neutral-300/30 w-fit justify-center",
                )}
                aria-expanded={isOpen}
                aria-controls={listId}
            >
                History
                <Calculator className="h-5 text-yellow-600" aria-hidden="true" />
            </button>


            <ul
                id={listId}

                className={clsx(
                    "w-0 h-0 m-0 p-0 overflow-hidden flex flex-col items-stretch gap-2 rounded-2xl",
                    "transition-all duration-300 ease-in-out shadow-2xl inset-shadow-sm  bg-neutral-200",
                    "inset-shadow-sm",
                    isOpen && "w-full h-full grow  overflow-y-scroll mt-2 p-2"
                )}
                aria-label="Lista de expressões salvas"
            >
                {items.length === 0 ? (
                    <li className="text-neutral-600 text-sm px-2 py-2">Sem histórico ainda</li>
                ) : (
                    items.map((item) => (
                        <li key={item.key}>
                            <button
                                type="button"
                                onClick={() => setExpression(item.expression)}
                                className={clsx(
                                    "w-full bg-white rounded-2xl shadow-sm",
                                    "flex items-center justify-between gap-3",
                                    "hover:shadow-md transition-shadow cursor-pointer",
                                    "border border-neutral-300/30 hover:bg-neutral-100",
                                    "px-3 py-2 text-left",
                                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                                )}
                                title={`Usar “${item.expression}”`}
                            >
                                <span className="text-neutral-600 font-medium px-2 text-xs truncate">
                                    {item.expression}
                                </span>
                                <span className="text-neutral-400" aria-hidden="true">=</span>
                                <span className="text-xl font-semibold text-neutral-800 pr-2 truncate">
                                    {item.result}
                                </span>
                                <Calculator className="h-5" aria-hidden="true" />
                            </button>
                        </li>
                    ))
                )}
            </ul>


        </section>
    );
}
