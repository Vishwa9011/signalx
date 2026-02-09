'use client';

import { useRoundStore } from '@/features/market/store/roundStore';
import useBlockchainRead from '@/features/web3/hooks/useBlockchainRead';
import type { ActiveBet } from '@/types';
import { useEffect, useMemo } from 'react';
import { formatActiveBets } from '@/lib';
import useNetworkConfig from '@/features/web3/hooks/useNetworkData';
import { useAccount } from 'wagmi';
import { zeroAddress } from 'viem';
import { bitcoinStore } from '@/features/market/store/bitcoinStore';

type ActiveBetSummary = {
    totalBets: number;
    totalBetAmount: number;
    totalUpSideBetAmount: number;
    totalDownSideBetAmount: number;
    totalCurrentAmount: number;
    totalPotentialPayout: number | null;
    totalPotentialPayoutPercentage: number | null;
};

/**
 * Hook to fetch and summarize the user's active bets for the current round.
 * Returns formatted bets, summary, loading state, and refetch function.
 */
export default function useUserActiveBets() {
    const { address } = useAccount();
    const { decimals } = useNetworkConfig();
    const { points } = bitcoinStore();

    const { currentRoundId, roundRefetchTrigger, round, roundPools } = useRoundStore();

    const { data, isPending, refetch } = useBlockchainRead<ActiveBet<bigint>[]>(
        'signalx',
        'getActiveBetsForUserInRound',
        [BigInt(currentRoundId), address || zeroAddress],
    );

    const formattedActiveBets = useMemo(() => (data ? formatActiveBets(data, decimals) : []), [data, decimals]);

    const summary = useMemo(() => {
        return formattedActiveBets.reduce(
            (acc, bet) => {
                acc.totalBets += 1;
                acc.totalBetAmount += bet.amount;
                acc.totalCurrentAmount += bet.currentValue;
                if (bet.direction === 1) {
                    acc.totalUpSideBetAmount += bet.amount;
                } else if (bet.direction === 2) {
                    acc.totalDownSideBetAmount += bet.amount;
                }

                return acc;
            },
            {
                totalBets: 0,
                totalBetAmount: 0,
                totalUpSideBetAmount: 0,
                totalDownSideBetAmount: 0,
                totalCurrentAmount: 0,
                totalPotentialPayout: null,
                totalPotentialPayoutPercentage: null,
            } as ActiveBetSummary,
        );
    }, [formattedActiveBets]);

    useEffect(() => {
        refetch();
    }, [roundRefetchTrigger, currentRoundId, address, refetch]);

    const totalPotentialPayout = useMemo(() => {
        const latestPoint = points.length > 0 ? points[points.length - 1] : null;
        if (latestPoint && round.endPrice == 0 && round.startPrice > 0) {
            const isPriceUp = round.startPrice < latestPoint.y;
            if (isPriceUp && summary.totalUpSideBetAmount > 0) {
                const estimatedPayout = roundPools.upMultiplier * summary.totalUpSideBetAmount;
                const estimatedPayoutPercentage = (estimatedPayout / summary.totalBetAmount) * 100;
                return { estimatedPayout, estimatedPayoutPercentage };
            } else if (!isPriceUp && summary.totalDownSideBetAmount > 0) {
                const estimatedPayout = roundPools.downMultiplier * summary.totalDownSideBetAmount;
                const estimatedPayoutPercentage = (estimatedPayout / summary.totalBetAmount) * 100;
                return { estimatedPayout, estimatedPayoutPercentage };
            } else if (summary.totalBetAmount > 0) {
                return { estimatedPayout: 0, estimatedPayoutPercentage: 0 };
            }
            return { estimatedPayout: null, estimatedPayoutPercentage: null };
        }
        return { estimatedPayout: null, estimatedPayoutPercentage: null };
    }, [points.length, round.startPrice, round.endPrice, summary.totalBetAmount, roundPools.totalPool]);

    summary.totalPotentialPayout = totalPotentialPayout.estimatedPayout;
    summary.totalPotentialPayoutPercentage = totalPotentialPayout.estimatedPayoutPercentage;

    return useMemo(
        () => ({
            data: formattedActiveBets,
            summary,
            isPending,
            totalPotentialPayout,
            refetch,
        }),
        [formattedActiveBets, summary, isPending, refetch],
    );
}
