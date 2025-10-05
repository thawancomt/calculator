import clsx from "clsx";
import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";
import { useCalculator } from "../context/expressionContext";

interface HistoryProps extends React.ComponentProps<"aside"> {}

export default function History({ className, ...rest }: HistoryProps) {
    const { history, setExpression } = useCalculator();
    const [isOpen, setIsOpen] = useState(false);

    const listId = "history-list";

    const items = useMemo(
        () =>
            history.map((it) => ({
                ...it,
                key: `${it.expression}=${it.result}`,
            })),
        [history]
    );

    return (
        <aside
            aria-labelledby="history-title"
            className={clsx(
                "flex flex-col gap-3 rounded-2xl border border-neutral-300/50 bg-neutral-200/80 p-4",
                "shadow-lg backdrop-blur",
                className
            )}
            {...rest}
        >
            <div className="flex items-center justify-between gap-4">
                <h2 id="history-title" className="text-lg font-semibold text-neutral-700">
                    History
                </h2>
                <span className="rounded-full bg-neutral-300/80 p-2 text-neutral-600" aria-hidden="true">
                    <Calculator className="h-5 w-5" />
                </span>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className={clsx(
                    "flex w-full items-center justify-between rounded-xl border border-neutral-300/60",
                    "bg-white px-4 py-2 text-left text-sm font-medium text-neutral-700 shadow-sm",
                    "transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2",
                    "focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                )}
                aria-expanded={isOpen}
                aria-controls={listId}
            >
                <span>{isOpen ? "Hide history" : "Show history"}</span>
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>

            <ul
                id={listId}
                className={clsx(
                    "flex flex-col gap-2 overflow-hidden rounded-xl bg-neutral-100/80 p-0",
                    "transition-all duration-300 ease-in-out",
                    isOpen
                        ? "max-h-72 border border-neutral-200 p-2"
                        : "max-h-0 border border-transparent"
                )}
                aria-label="Lista de expressões salvas"
            >
                {items.length === 0 ? (
                    <li className="px-2 py-2 text-sm text-neutral-600">Sem histórico ainda</li>
                ) : (
                    items.map((item) => (
                        <li key={item.key}>
                            <button
                                type="button"
                                onClick={() => setExpression(item.expression)}
                                className={clsx(
                                    "flex w-full items-center justify-between gap-3 rounded-xl border border-neutral-200",
                                    "bg-white px-3 py-2 text-left shadow-sm transition-colors",
                                    "hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2",
                                    "focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                                )}
                                title={`Usar “${item.expression}”`}
                            >
                                <span className="truncate text-xs font-medium text-neutral-600">
                                    {item.expression}
                                </span>
                                <span className="text-neutral-400" aria-hidden="true">
                                    =
                                </span>
                                <span className="truncate text-xl font-semibold text-neutral-800">
                                    {item.result}
                                </span>
                                <Calculator className="h-5" aria-hidden="true" />
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </aside>
    );
}
