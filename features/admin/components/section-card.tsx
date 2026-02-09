'use client';

export default function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-xl ${className}`}>{children}</div>;
}
