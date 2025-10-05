import { useCalculator } from "../context/expressionContext";
import Button from "./Button";
import clsx from "clsx";

export default function CalculatorGrid() {
    const { clearExpr, addSignal, addDigit, addParens, evaluateExpr } = useCalculator();

    return (
        <section
            aria-labelledby="calc-keypad-title"
            className="m-4 grow min-h-fit "
        >
            {/* Cabeçalho só para SR (leitores de tela) */}
            <h2 id="calc-keypad-title" className="sr-only">
                Teclado da calculadora
            </h2>

            <div
                role="group"
                aria-label="Calculation keyboard"
                className={clsx(
                    "grid grid-cols-4 grow p-4 gap-2 bg-neutral-300 rounded-2xl h-full",
                    "shadow-lg inset-shadow-2xs border border-neutral-600/15"
                )}
            >
                <Button
                    kind="clear"
                    text="C"
                    value={"Clear"}
                    onPress={clearExpr}
                    aria-label="Clean all expression"
                    aria-keyshortcuts="Escape,Backspace"
                    title="Clean (Esc or Backspace)"
                />
                <Button
                    kind="operator-alternative"
                    text="()"
                    value={"( )"}
                    onPress={addParens}
                    aria-label="insert parens"
                    aria-keyshortcuts="P"
                    title="Parenteses (P)"
                />
                <Button
                    kind="operator-alternative"
                    text="%"
                    value={"%"}
                    onPress={addSignal}
                    aria-label="Porcent"
                    aria-keyshortcuts="%"
                    title="Porcentage (%)"
                />
                <Button
                    kind="operator-alternative"
                    text="/"
                    value={"/"}
                    onPress={addSignal}
                    aria-label="Divide"
                    aria-keyshortcuts="/"
                    title="Divide (/)"
                />

                {/* Linha 2 */}
                <Button kind="digit" onPress={addDigit} text="1" value={1} aria-keyshortcuts="1" />
                <Button kind="digit" onPress={addDigit} text="2" value={2} aria-keyshortcuts="2" />
                <Button kind="digit" onPress={addDigit} text="3" value={3} aria-keyshortcuts="3" />
                <Button
                    kind="operator"
                    onPress={addSignal}
                    text="*"
                    value={"*"}
                    aria-label="multiply"
                    aria-keyshortcuts="*"
                    title="multiply (*)"
                />

                {/* Linha 3 */}
                <Button kind="digit" onPress={addDigit} text="4" value={4} aria-keyshortcuts="4" />
                <Button kind="digit" onPress={addDigit} text="5" value={5} aria-keyshortcuts="5" />
                <Button kind="digit" onPress={addDigit} text="6" value={6} aria-keyshortcuts="6" />
                <Button
                    kind="operator"
                    onPress={addSignal}
                    text="-"
                    value={"-"}
                    aria-label="subtract"
                    aria-keyshortcuts="-"
                    title="subtract (-)"
                />

                {/* Linha 4 */}
                <Button kind="digit" onPress={addDigit} text="7" value={7} aria-keyshortcuts="7" />
                <Button kind="digit" onPress={addDigit} text="8" value={8} aria-keyshortcuts="8" />
                <Button kind="digit" onPress={addDigit} text="9" value={9} aria-keyshortcuts="9" />
                <Button
                    kind="operator"
                    onPress={addSignal}
                    text="+"
                    value={"+"}
                    aria-label="Sum"
                    aria-keyshortcuts="+"
                    title="Sum (+)"
                />

                {/* Linha 5 */}
                <Button kind="digit" onPress={addDigit} text="0" value={0} aria-keyshortcuts="0" />
                <Button
                    kind="digit"
                    onPress={addDigit}
                    text="."
                    value={"."}
                    aria-label="decimal period"
                    aria-keyshortcuts="."
                    title="Period (.)"
                />
                <Button
                    kind="evalutate"
                    onPress={evaluateExpr}
                    text="="
                    value={"="}
                    className="col-span-2"
                    aria-label="Calculate result"
                    aria-keyshortcuts="Enter"
                    title="Calculate (Enter)"
                />
            </div>
        </section>
    );
}
