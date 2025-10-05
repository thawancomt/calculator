import Display from "./components/Display"
import History from "./components/History"
import CalculatorGrid from "./components/Grid"

function App() {
    return (
        <div className="h-[100dvh] bg-neutral-100 py-6">
            <div className="mx-auto flex h-full  w-full flex-col gap-4 px-4 sm:px-6">
                <Display className="rounded-2xl bg-neutral-800 shadow-2xl" />

                <main className="flex grow flex-col gap-4 min-h-0 sm:flex-row">
                    <History className="min-h-0" />
                    <CalculatorGrid />
                </main>
            </div>
        </div>
    )
}

export default App
