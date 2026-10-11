import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/assets/styles/globals.css'
import { BrowserRouter } from "react-router"
import App from './app/App.tsx'
import { store } from "./app/store/store.ts"
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
