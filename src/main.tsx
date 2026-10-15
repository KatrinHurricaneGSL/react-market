import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/assets/styles/globals.css'
import { BrowserRouter, HashRouter } from "react-router"
import App from './app/App.tsx'
import { store } from "./app/store/store.ts"
import { Provider } from 'react-redux'

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.PROD
      ? <HashRouter>{app}</HashRouter>
      : <BrowserRouter>{app}</BrowserRouter>}
  </StrictMode>,
)
