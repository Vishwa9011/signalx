'use client';

import SectionCard from './SectionCard';
import PendingRoundRow from './PendingRoundRow';
import usePendingResultRounds from '@/features/market/hooks/usePendingResultRounds';

export default function PendingRoundsTable() {
    const { pendingRounds, isPending, refetch } = usePendingResultRounds();

    return (
        <SectionCard>
            <h2 className="mb-4 text-xl font-semibold text-slate-800">Pending Rounds</h2>
            {isPending ? (
                <p className="py-8 text-center text-slate-500">Loading pending rounds...</p>
            ) : pendingRounds.length === 0 ? (
                <p className="py-8 text-center text-slate-500">No pending rounds found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                {['Round', 'Start', 'End', 'Total', 'Up', 'Down', 'Status', 'Action'].map(h => (
                                    <th key={h} className="px-4 py-3 font-semibold text-slate-600">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRounds.map(r => (
                                <PendingRoundRow key={r.round} round={r} onResolve={refetch} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </SectionCard>
    );
}
