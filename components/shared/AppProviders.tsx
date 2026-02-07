'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Web3Provider from '@/features/web3/providers/Web3Provider';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </Web3Provider>
  );
}
