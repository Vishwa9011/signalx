'use client';

import { useEffect, useCallback, useMemo } from 'react';

import { formatAndCategorizeBets, formatRoundData } from '@/lib';
import useNetworkConfig from '@/features/web3/hooks/use-network-data';
import { useRoundStore } from '@/features/market/store/round-store';
import useBlockchainRead from '@/features/web3/hooks/use-blockchain-read';
import useBlockchainEvent from '@/features/web3/hooks/use-blockchain-event';
import type { Bet, Round } from '@/types';

export const useRound = () => {
    const { decimals } = useNetworkConfig();
    const { roundRefetchTrigger, triggerRoundRefetch } = useRoundStore();

    const {
        data: rawRoundData,
        isPending,
        error,
        refetch,
    } = useBlockchainRead<Round<bigint>>('signalx', 'getCurrentRound');
    const roundBets = useBlockchainRead<Bet<bigint>[]>('signalx', 'getRoundBets', [rawRoundData?.round || 0n]);

    const stableRefetch = useCallback(() => {
        return refetch();
    }, [refetch]);

    const formattedRound = useMemo(() => {
        if (!rawRoundData) return null;
        return formatRoundData(rawRoundData, decimals);
    }, [rawRoundData, decimals]);

    const formattedRoundBets = useMemo(() => {
        if (!roundBets.data) return { upBets: [], downBets: [] };
        return formatAndCategorizeBets(roundBets.data, decimals);
    }, [roundBets.data, decimals]);

    useEffect(() => {
        if (formattedRound) {
            const { updateRound, updateCurrentRoundId } = useRoundStore.getState();
            updateRound(formattedRound);
            updateCurrentRoundId(formattedRound.round);
        }
    }, [formattedRound]);

    useEffect(() => {
        if (formattedRoundBets) {
            const { setRoundBets } = useRoundStore.getState();
            setRoundBets(formattedRoundBets);
        }
    }, [formattedRoundBets]);

    const handleRoundStarted = useCallback(
        (logs: Array<{ args: object }>) => {
            console.log('🟢 RoundStarted event:', logs[0]?.args);
            triggerRoundRefetch();
        },
        [triggerRoundRefetch],
    );

    const handleRoundEnded = useCallback(
        (logs: Array<{ args: object }>) => {
            console.log('🔴 RoundEnded event:', logs[0]?.args);
            triggerRoundRefetch();
        },
        [triggerRoundRefetch],
    );

    const handleTradePlaced = useCallback(() => {
        console.log('💰 TradePlaced event: refreshing pool data');
        triggerRoundRefetch();
    }, [triggerRoundRefetch]);

    useBlockchainEvent('signalx', 'RoundStarted', { onLogs: handleRoundStarted });
    useBlockchainEvent('signalx', 'RoundEnded', { onLogs: handleRoundEnded });
    useBlockchainEvent('signalx', 'BetPlaced', { onLogs: handleTradePlaced });

    useEffect(() => {
        stableRefetch();
        roundBets.refetch();
    }, [roundRefetchTrigger, stableRefetch, roundBets.refetch]);

    return {
        round: formattedRound,
        isLoading: isPending,
        error,
        refetch: stableRefetch,
    };
};
