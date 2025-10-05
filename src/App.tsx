import Display from "./components/Display"

import History from "./components/History";
import CalculatorGrid from "./components/Grid";

function App() {

  return (
    <div className="flex flex-col w-[100vw] h-[100dvh] bg-neutral-100 relative">
      <Display className="min-h-2/12 bg-neutral-700 rounded-2xl m-4 shadow-2xl inset-shadow-sm inset-shadow-neutral-600" />


      <main className="grow flex flex-col min-h-0 sm:flex-row ">
        <History className="max-h-4/12 sm:max-h-full "/>
        <CalculatorGrid/>
      </main>

    </div>
  )
}

export default App
