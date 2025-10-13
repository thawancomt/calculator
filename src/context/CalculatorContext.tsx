import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { addHistory, getHistory, type HistoryItem } from "../utils/localStorage"
import { evaluate, log } from "mathjs"

/**
 * Public API exposed through the calculator context. The fields are grouped by
 * the type of interaction they enable so consumers can easily discover the
 * available helpers.
 */
interface CalculatorContextValue {
    /** Current expression shown on the calculator display. */
    expression: string
    /** Persisted history entries pulled from localStorage. */
    history: HistoryItem[]
    /** Clears the current expression and resets any error flags. */
    clearExpr: () => void

    /** Input helpers that mutate the expression by appending characters. */
    addDigit: (value: string) => void
    addSignal: (value: string) => void
    addParens: () => void

    /** Evaluates the expression and updates state with the computed result. */
    evaluateExpr: () => void
    /** Low-level setter in case a consumer needs direct access. */
    setExpression: React.Dispatch<React.SetStateAction<string>>
}


const CalculatorContext = createContext<CalculatorContextValue | null>(null)

/**
 * Provides calculator state management to the component tree, including input
 * helpers, evaluation logic and persisted history synchronization.
 */
export function CalculatorProvider({ children }: { children: ReactNode }) {

    const [expression, setExpression] = useState("")
    const [history, setHistory] = useState<HistoryItem[] | []>(getHistory())
    const [error, setError] = useState<boolean>(false)



    /** Safely evaluates the current expression and stores the result in history. */
    const evaluateExpr = useCallback(() => {
        try {

            const result = String(evaluate(expression))
            addHistory({
                expression: expression,
                result: result
            })

            setExpression(
                result
            )

            setHistory(getHistory())


        } catch (error) {
            setError(true)
            setExpression("Error")
        }
    }, [expression])

    /**
     * Inserts parentheses while keeping the expression valid. When possible it
     * closes an open pair, otherwise it decides whether to multiply before
     * opening a new pair.
     */
    const addParens = useCallback(() => {

        if (error) {
            clearExpr()
        }

        const opens = (expression.match(/\(/g) || []).length;
        const closes = (expression.match(/\)/g) || []).length;
        const last = expression.at(-1) ?? "";

        const canClose = opens > closes && /[0-9)]/.test(last);

        if (canClose) {
            setExpression(prev => prev + ")");
            return;
        }


        if (/[0-9)]/.test(last) || last === ")") {
            setExpression(prev => prev + "*(");
        } else {
            setExpression(prev => prev + "(");
        }
    }, [error, expression]);

    /** Adds or replaces arithmetic operators while preventing invalid sequences. */
    const addSignal = useCallback((value: string) => {

        if (error) {
            clearExpr()
        }

        const last = expression.charAt(expression.length - 1)


        if (expression === "" && value !== "-") return;

        if (/[+\-*/%\\.]/.test(last)) {
            setExpression(prev => prev.slice(0, -1) + value)
        } else {
            setExpression(prev => prev + value)
        }
    }, [error, expression])

    /** Appends digits (or decimal separators) to the expression. */
    const addDigit = useCallback((value: string) => {

        if (error) {
            clearExpr()
        }

        setExpression(prev => prev + value)
    }, [error, expression])

    /** Removes all content from the expression and clears error state. */
    const clearExpr = useCallback(() => {
        setExpression("");
        setError(false);
    }, []);

    // Map keyboard shortcuts to the same helpers used by the on-screen buttons.
    useEffect(() => {

        const eventListiner = (e: KeyboardEvent) => {

            

            if (/\d/.test(e.key)) return addDigit(e.key)
            if (/[+\-*/%\\.]/.test(e.key)) return addSignal(e.key)
            if (e.key === "Escape") return clearExpr()
            if (e.key === "Backspace") return setExpression(prev => prev.slice(0, -1))
            if (e.key === "Enter") {
                e.preventDefault()
                evaluateExpr()
                return;
            }

        }

        window.addEventListener("keydown", eventListiner)

        return () => window.removeEventListener("keydown", eventListiner)

    }, [expression])

    const value = useMemo<CalculatorContextValue>(() => ({
        expression, history, clearExpr, addDigit, addParens, addSignal, evaluateExpr, setExpression
    }), [expression, history, evaluateExpr, clearExpr, addDigit, addParens, addSignal, setExpression])

    return <CalculatorContext.Provider value={value} >
        {children}
    </CalculatorContext.Provider>

}
/** Convenience hook that guards against usage outside of the provider. */
function useCalculator() {
    const ctx = useContext(CalculatorContext);

    if (!ctx) throw new Error("useCalculator mus be used inside a CalculatorProvider :)")

    return ctx
}

export {
    useCalculator
}