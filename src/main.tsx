import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/assets/styles/globals.css'
import { BrowserRouter } from "react-router"
import App from './App.tsx'
import { store } from "./redux/store"
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
