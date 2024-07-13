import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Web3ModalProvider } from "./components/WalletConnect/Web3ModalProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ModalProvider>
        <App />
      </Web3ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
