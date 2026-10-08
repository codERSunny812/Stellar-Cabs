import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './Context/UserContext.jsx'
import { CaptionContextProvider } from './Context/CaptionContext.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <CaptionContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </CaptionContextProvider>
    </SocketProvider>
  </StrictMode>,
)