import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/User.context.jsx'
import { CaptionContextProvider } from './context/Caption.context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptionContextProvider>
    <UserContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContextProvider>
    </CaptionContextProvider>
  </StrictMode>,
)
