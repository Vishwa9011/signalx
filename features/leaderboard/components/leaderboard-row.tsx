'use client';

import { cn, formatCurrency, truncateString } from '@/lib';
import type { UserStats } from '@/types';
import { LeaderboardRankBadge } from './LeaderboardRankBadge';

type LeaderboardRowProps = {
    userStats: UserStats;
    rank: number;
    index: number;
    totalRows: number;
};

export const LeaderboardRow = ({ userStats, rank, index, totalRows }: LeaderboardRowProps) => {
    const isEvenRow = index % 2 === 0;
    const isFirstRow = index === 0;
    const isLastRow = index === totalRows - 1;

    return (
        <tr
            className={cn(
                isEvenRow ? 'bg-white' : 'bg-[#F9FBFF]',
                !isLastRow && 'border-b border-[#E9EDF5]',
                isFirstRow && 'rounded-t-2xl',
                isLastRow && 'rounded-b-2xl',
            )}
        >
            <td className={cn('px-6 py-3', isLastRow && 'rounded-bl-2xl')}>
                <div className="flex items-center justify-center">
                    <LeaderboardRankBadge rank={rank} />
                </div>
            </td>
            <td className="px-6 py-3 text-sm leading-5 font-normal text-[#717182]">
                {truncateString(userStats.user || '')}
            </td>
            <td className="px-6 py-3 text-sm leading-5 font-medium text-[#030213]">
                {formatCurrency(userStats.totalAmountBet)}
            </td>
            <td className="px-6 py-3 text-sm leading-5 font-medium text-[#030213]">
                {formatCurrency(userStats.totalAmountWon)}
            </td>
        </tr>
    );
};
