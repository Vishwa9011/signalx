'use client';

import type { Round } from '@/types';
import { formatTime, formatCurrency } from '@/lib';
import RoundControlForm from './round-control';

type PendingRoundRowProps = {
    round: Round;
    onResolve: () => void;
};

export default function PendingRoundRow({ round, onResolve }: PendingRoundRowProps) {
    return (
        <tr className="border-b last:border-none hover:bg-slate-50">
            <td className="px-4 py-3 font-medium">#{round.round}</td>
            <td className="px-4 py-3">{formatTime(round.startTime)}</td>
            <td className="px-4 py-3">{formatTime(round.endTime)}</td>
            <td className="px-4 py-3">{formatCurrency(round.totalPool)}</td>
            <td className="px-4 py-3">{formatCurrency(round.upPool)}</td>
            <td className="px-4 py-3">{formatCurrency(round.downPool)}</td>

            <td className="px-4 py-3">
                <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">Pending</span>
            </td>

            <td>
                <RoundControlForm round={round} isRoundId={false} onResolve={onResolve} />
            </td>
        </tr>
    );
}
