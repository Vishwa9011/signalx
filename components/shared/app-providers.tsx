'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Web3Provider from '@/features/web3/providers/web3-provider';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </Web3Provider>
  );
}
