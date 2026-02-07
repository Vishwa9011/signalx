'use client';

import type { ReactNode } from 'react';
import AppProviders from '@/components/shared/AppProviders';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <main className="min-h-dvh">{children}</main>
    </AppProviders>
  );
}
