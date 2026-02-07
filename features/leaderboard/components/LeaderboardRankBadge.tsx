'use client';

import Rank1Medal from '@/constants/svgs/Rank1Medal';
import Rank2Medal from '@/constants/svgs/Rank2Medal';
import Rank3Medal from '@/constants/svgs/Rank3Medal';

type LeaderboardRankBadgeProps = {
    rank: number;
};

export const LeaderboardRankBadge = ({ rank }: LeaderboardRankBadgeProps) => {
    if (rank === 1) {
        return <Rank1Medal className="h-6 w-6" />;
    }

    if (rank === 2) {
        return <Rank2Medal className="h-6 w-6" />;
    }

    if (rank === 3) {
        return <Rank3Medal className="h-6 w-6" />;
    }

    return <span className="text-center text-sm leading-5 font-semibold text-[#717182]">{rank}</span>;
};
