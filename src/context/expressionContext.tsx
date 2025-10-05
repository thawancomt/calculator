import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { addHistory, getHistory, type HistoryItem } from "../utils/localStorage"
import { evaluate } from "mathjs"

interface CalculatorContextValue {
    expression: string
    history: HistoryItem[]
    clearExpr: () => void

    // operators
    addDigit: (value: string) => void
    addSignal: (value: string) => void
    addParens: () => void

    evaluateExpr: () => void
    setExpression: React.Dispatch<React.SetStateAction<string>>
}


const CalculatorContext = createContext<CalculatorContextValue | null>(null)

export function CalculatorProvider({ children }: { children: ReactNode }) {

    const [expression, setExpression] = useState("")

    const expressionRef = useRef(expression)

    useEffect(() => {
        expressionRef.current = expression
    }, [expression])

    const [history, setHistory] = useState<HistoryItem[] | []>(getHistory())

    const evaluateExpr = useCallback(() => {
        try {

            const result = String(evaluate(expressionRef.current))
            addHistory({
                expression: expressionRef.current,
                result: result
            })

            setExpression(
                result
            )

            setHistory(getHistory())


        } catch (error) {
            setExpression("Error")
        }
    }, [expressionRef.current])

    const addParens = () => {
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
    };

    const addSignal = (value: string) => {

        
        const last = expressionRef.current.charAt(expressionRef.current.length - 1)
        

        if (expressionRef.current === "" && value !== "-") return;

        if (/[+\-*/%]/.test(last)) {

            setExpression(prev => prev.slice(0, -1) + value)
        } else {
            setExpression(prev => prev + value)
        }
    }

    const addDigit = (value: string) => {
        setExpression(prev => prev + value)
    }

    const clearExpr = () => {
        setExpression("")
    }

    // Keyboard mapping
    useEffect(() => {

        const eventListiner = (e: KeyboardEvent) => {


            if (/\d/.test(e.key)) return addDigit(e.key)
            if (/[+\-*/%]/.test(e.key)) return addSignal(e.key)
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

    }, [])

    const value = useMemo<CalculatorContextValue>(() => ({
        expression, history, clearExpr, addDigit, addParens, addSignal, evaluateExpr, setExpression
    }), [expression, history, evaluateExpr, clearExpr, addDigit, addParens, addSignal, setExpression])

    return <CalculatorContext.Provider value={value} >
        {children}
    </CalculatorContext.Provider>

}
function useCalculator() {
    const ctx = useContext(CalculatorContext);

    if (!ctx) throw new Error("useCalculator mus be used inside a CalculatorProvider :)")

    return ctx
}

export {
    useCalculator
}