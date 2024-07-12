import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Web3ModalProvider } from "./components/WalletConnect/Web3ModalProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ModalProvider>
        <App />
      </Web3ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
