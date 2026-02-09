'use client';

export function RoundStatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex min-w-[70px] flex-col items-center">
            <div className="mb-0.5 text-[11px] text-slate-400">{label}</div>
            <div className="text-sm font-semibold text-slate-700">{value}</div>
        </div>
    );
}

export function StatDivider() {
    return <div className="mx-1 h-7 w-px bg-slate-200" />;
}
