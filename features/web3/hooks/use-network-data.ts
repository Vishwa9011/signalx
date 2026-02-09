'use client';

import { getNetworkConfig } from '@/features/web3/config/network';
import { useAccount } from 'wagmi';

export default function useNetworkConfig() {
    const { chainId } = useAccount();
    return getNetworkConfig(chainId);
}
