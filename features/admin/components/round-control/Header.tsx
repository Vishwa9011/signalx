'use client';

import type { Round } from '@/types';

type RoundHeaderProps = {
    round: Round;
};

const RoundHeader = ({ round }: RoundHeaderProps) => {
    const chips = [
        { label: 'Current Round', value: `#${round.round || 0}` },
        { label: 'Start Price', value: round.startPrice || '—' },
        {
            label: 'Start Time',
            value: round.startTime && round.startTime > 0 ? new Date(round.startTime).toLocaleString() : 'Not set',
        },
        {
            label: 'created At',
            value: new Date(round.createdAt * 1000).toLocaleString(),
        },
    ];

    return (
        <header className="mb-6 space-y-2">
            <p className="text-xs tracking-[0.2em] text-indigo-500 uppercase">Manual controls</p>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Round Management</h3>
                <div className="flex flex-wrap gap-2">
                    {chips.map(chip => (
                        <InfoChip key={chip.label} label={chip.label} value={chip.value} />
                    ))}
                </div>
            </div>
        </header>
    );
};

type InfoChipProps = { label: string; value: string | number };

const InfoChip = ({ label, value }: InfoChipProps) => (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {label}: {value}
    </span>
);

export default RoundHeader;
