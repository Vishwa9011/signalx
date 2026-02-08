"use client";

import { env } from "@/lib";
import type { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage, WagmiProvider } from "wagmi";
import { type AppKitNetwork, sepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const DEFAULT_NETWORK = sepolia;

const queryClient = new QueryClient();
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [DEFAULT_NETWORK];

const projectId = env.NEXT_PUBLIC_PROJECT_ID;

const metadata = {
  name: "SignalX",
  description:
    "SignalX is the decentralized prediction market where you trade on the outcome of  anything and convert your insight into profit.",
  url: "https://example.com",
  icons: [""],
};

const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  networks,
  projectId,
  ssr: true,
});

let isAppKitInitialized = false;

function initializeAppKit() {
  if (isAppKitInitialized) return;

  createAppKit({
    adapters: [wagmiAdapter],
    networks,
    defaultNetwork: DEFAULT_NETWORK,
    projectId,
    metadata,
    features: {
      analytics: true,
      email: false,
      socials: false,
    },
    themeMode: "light",
    debug: true,
    themeVariables: {
      "--w3m-border-radius-master": "0rem",
      "--w3m-color-mix": "#1549B3",
      "--w3m-qr-color": "#1549B3",
    },
  });
  isAppKitInitialized = true;
}

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  initializeAppKit();

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export const AppkitProvider = Web3Provider;
export default Web3Provider;
