import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Your WalletConnect Cloud project ID
const projectId = "1afbe4555cba9ef3da26eeacf30fa27b";

// 2. Create wagmiConfig
const metadata = {
  name: "EthGlobal",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    socials: ["google", "x", "github", "discord", "apple"],
    showWallets: true,
    walletFeatures: true,
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

import { ReactNode } from "react";

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
