'use client';

import { useAccount } from 'wagmi';
import { zeroAddress } from 'viem';
import type { TradeHistory } from '@/types';
import { formatTradeHistory } from '@/lib';
import useNetworkConfig from '@/features/web3/hooks/useNetworkData';
import useBlockchainRead from '@/features/web3/hooks/useBlockchainRead';
import { useMemo, useState, useCallback } from 'react';

const LIMIT_PER_PAGE = 10n;

type TimeFilter = 'all_time' | 'this_month';

export const useTradeHistory = (timeFilter: TimeFilter = 'all_time') => {
    const { decimals } = useNetworkConfig();
    const [currentPage, setCurrentPage] = useState(1);
    const { address } = useAccount();

    const { data: userTradeCount } = useBlockchainRead<bigint>('signalx', 'getUserTradeCount', [
        address || zeroAddress,
    ]);

    // Fetch paginated trades (latest first)
    const tradeHistory = useBlockchainRead<TradeHistory<bigint>[]>('signalx', 'getUserTradeHistory', [
        address || zeroAddress,
        BigInt((currentPage - 1) * Number(LIMIT_PER_PAGE)),
        LIMIT_PER_PAGE,
    ]);

    const formattedTradeHistory = useMemo(() => {
        if (!tradeHistory.data) return null;
        return formatTradeHistory(tradeHistory.data, decimals);
    }, [tradeHistory.data, decimals]);

    const filteredTradeHistory = useMemo(() => {
        if (!formattedTradeHistory) return null;
        if (timeFilter === 'all_time') return formattedTradeHistory;

        // Get start of current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

        // Filter trades from current month
        return formattedTradeHistory.filter(trade => trade.timestamp >= startOfMonth);
    }, [formattedTradeHistory, timeFilter]);

    const handlePagination = useCallback(
        (value: number) => () => {
            setCurrentPage(v => v + value);
        },
        [],
    );

    return {
        data: filteredTradeHistory,
        userTradeCount: userTradeCount ? Number(userTradeCount) : 0,
        isPending: tradeHistory.isPending,
        refetch: tradeHistory.refetch,
        nextPage: handlePagination(1),
        prevPage: handlePagination(-1),
        currentPage,
        setCurrentPage,
    };
};
