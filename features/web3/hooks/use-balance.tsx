'use client';

import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import { useCallback } from 'react';
import { convertToNumber } from '@/lib';
import useNetworkConfig from './use-network-data';
import useBlockchainRead from './use-blockchain-read';

export default function useBalance() {
    const { address } = useAccount();
    const { decimals } = useNetworkConfig();
    const { data, refetch, isPending } = useBlockchainRead<bigint>('token', 'balanceOf', [address as Address]);

    const stableRefetch = useCallback(() => {
        return refetch();
    }, [refetch]);

    return {
        balance: convertToNumber(data ?? BigInt(0), decimals),
        isPending,
        refetch: stableRefetch,
    };
}
