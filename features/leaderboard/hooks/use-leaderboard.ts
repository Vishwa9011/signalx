'use client';

import { useMemo } from 'react';
import { formatLeaderboard } from '@/lib';
import type { UserStats } from '@/types';
import useNetworkConfig from '@/features/web3/hooks/useNetworkData';
import useBlockchainRead from '@/features/web3/hooks/useBlockchainRead';

export const useLeaderboard = () => {
    const { decimals } = useNetworkConfig();
    const leaderboard = useBlockchainRead<UserStats<bigint>[]>('signalx', 'getLeaderboard', [10n]);

    const formattedLeaderboard = useMemo(() => {
        if (!leaderboard.data) return [] as UserStats[];
        return formatLeaderboard(leaderboard.data, decimals);
    }, [leaderboard.data]);

    return {
        data: formattedLeaderboard,
        isPending: leaderboard.isPending,
        refetch: leaderboard.refetch,
    };
};
