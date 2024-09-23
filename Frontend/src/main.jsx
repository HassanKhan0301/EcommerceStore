import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppProvider from './context/AppProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppProvider>
  <div>
  <App />
  </div>
  </AppProvider>
  </BrowserRouter>
    
  
)
