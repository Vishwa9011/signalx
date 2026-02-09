'use client';

export const LeaderboardTableHeader = () => {
    return (
        <thead className="bg-[#F9FBFD] text-sm leading-[1.16069rem] font-semibold text-[#717182]">
            <tr className="border-b border-[#E9EDF5]">
                <th className="w-20 rounded-tl-2xl px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Volume</th>
                <th className="px-6 py-3 text-left">Amount Won</th>
            </tr>
        </thead>
    );
};
