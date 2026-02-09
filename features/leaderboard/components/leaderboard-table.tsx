'use client';

import type { UserStats } from '@/types';
import { LeaderboardTableHeader } from './leaderboard-table-header';
import { LeaderboardRow } from './leaderboard-row';

type LeaderboardTableProps = {
    data: UserStats[];
};

export const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
    return (
        <table className="w-full border-collapse text-sm text-gray-700">
            <LeaderboardTableHeader />
            <tbody>
                {data.map((userStats, index) => (
                    <LeaderboardRow
                        key={`${userStats.user}-${index}`}
                        userStats={userStats}
                        rank={index + 1}
                        index={index}
                        totalRows={data.length}
                    />
                ))}
            </tbody>
        </table>
    );
};
