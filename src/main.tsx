import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* wrap App component in BrowserRouter, indicates this will use React Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
