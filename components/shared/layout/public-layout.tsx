'use client';

import type { ReactNode } from 'react';
import AppProviders from '@/components/shared/AppProviders';
import Header from '@/components/shared/layout/Header';
import Footer from '@/components/shared/layout/Footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <main className="flex min-h-dvh flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </main>
    </AppProviders>
  );
}
