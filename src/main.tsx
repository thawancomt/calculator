import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CalculatorProvider } from './context/expressionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalculatorProvider>
      <App />
    </CalculatorProvider>
  </StrictMode>,
)
