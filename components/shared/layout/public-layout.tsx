'use client';

import type { ReactNode } from 'react';
import AppProviders from '@/components/shared/app-providers';
import Header from '@/components/shared/layout/header';
import Footer from '@/components/shared/layout/footer';

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
