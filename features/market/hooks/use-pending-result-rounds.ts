'use client';

import { useEffect, useMemo, useCallback } from 'react';
import useBlockchainRead from '@/features/web3/hooks/useBlockchainRead';
import type { Round } from '@/types';
import { formatRoundData } from '@/lib';
import useNetworkConfig from '@/features/web3/hooks/useNetworkData';
import { useInterval } from '@/features/market/hooks/useInterval';
import { useRoundStore } from '@/features/market/store/roundStore';

export default function usePendingResultRounds() {
    const { roundRefetchTrigger } = useRoundStore();
    const { decimals } = useNetworkConfig();

    const {
        data: rawRounds,
        isPending,
        refetch,
    } = useBlockchainRead<Round<bigint>[]>('signalx', 'getPendingResultRounds');

    const refresh = useCallback(() => {
        refetch?.();
    }, [refetch]);

    useInterval(refresh, 15000);

    useEffect(() => {
        refresh();
    }, [roundRefetchTrigger, refresh]);

    const pendingRounds = useMemo(() => {
        if (!rawRounds) return [];
        return rawRounds.map(r => formatRoundData(r, decimals)).reverse();
    }, [rawRounds, decimals]);

    return {
        pendingRounds,
        isPending,
        refetch: refresh,
    };
}
