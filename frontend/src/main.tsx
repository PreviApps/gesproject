import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Typography } from '@heroui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <Typography.Prose>
        <App />
      </Typography.Prose>
    </TooltipProvider>
  </StrictMode>,
)