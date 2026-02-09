'use client';

import { useRoundStore } from '@/features/market/store/roundStore';
import useBlockchainRead from '@/features/web3/hooks/useBlockchainRead';
import useNetworkConfig from '@/features/web3/hooks/useNetworkData';
import { formatRoundPoolData } from '@/lib';
import { useEffect, useMemo } from 'react';

export default function useRoundPools(roundId?: number) {
    const { decimals } = useNetworkConfig();
    const { currentRoundId, roundRefetchTrigger } = useRoundStore();
    const targetRound = roundId ?? currentRoundId;
    const roundPoolData = useBlockchainRead('signalx', 'getRoundPools', [BigInt(targetRound)], {
        query: {
            enabled: targetRound > 0,
        },
    });

    const isCurrentRound = roundId === undefined || roundId === currentRoundId;

    const formattedPools = useMemo(() => {
        if (!roundPoolData.data) return { upPool: 0, downPool: 0, totalPool: 0, upMultiplier: 0, downMultiplier: 0 };
        return formatRoundPoolData(roundPoolData.data, decimals);
    }, [roundPoolData.data, decimals]);

    useEffect(() => {
        if (!formattedPools) return;
        if (isCurrentRound) {
            useRoundStore.getState().setRoundPools(formattedPools);
        }
    }, [formattedPools]);

    useEffect(() => {
        roundPoolData.refetch?.();
    }, [roundRefetchTrigger, currentRoundId, roundPoolData.refetch]);

    return {
        data: formattedPools,
        isPending: roundPoolData.isPending,
        refetch: roundPoolData.refetch,
    };
}
