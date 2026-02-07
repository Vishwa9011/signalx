import type { ReactNode } from 'react';
import AdminLayout from '@/components/shared/layout/AdminLayout';

export default function AdminRouteLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
