import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Web3ModalProvider } from './components/WalletConnect/Web3ModalProvider'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Web3ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Web3ModalProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
