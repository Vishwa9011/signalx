'use client';

import { ERC20_ABI } from '@/features/web3/contracts/abi/ERC20';
import { SIGNALX_ABI } from '@/features/web3/contracts/abi/signalx';
import { getNetworkConfig } from '@/features/web3/config/network';
import type { ContractEventName } from 'viem';
import { useAccount, useWatchContractEvent, type UseWatchContractEventParameters } from 'wagmi';

// Type aliases for contract ABIs
type ERC20Abi = typeof ERC20_ABI;
type SignalXContractAbi = typeof SIGNALX_ABI;

// Utility type for contract events
type EventName<TAbi extends readonly unknown[]> = ContractEventName<TAbi>;

// Options type for the hook
type ContractEventOptions<TAbi extends readonly unknown[], TEventName extends EventName<TAbi>> = Omit<
    UseWatchContractEventParameters<TAbi, TEventName>,
    'address' | 'abi' | 'eventName'
>;

/**
 * Hook overload for watching SignalX contract events
 * Provides type-safe access to SignalX contract events
 */
export default function useBlockchainEvent<TEventName extends EventName<SignalXContractAbi>>(
    contractType: 'signalx',
    eventName: TEventName,
    options?: ContractEventOptions<SignalXContractAbi, TEventName>,
): void;

/**
 * Hook overload for watching ERC20 token contract events
 * Provides type-safe access to ERC20 token events
 */
export default function useBlockchainEvent<TEventName extends EventName<ERC20Abi>>(
    contractType: 'token',
    eventName: TEventName,
    options?: ContractEventOptions<ERC20Abi, TEventName>,
): void;

/**
 * Custom hook for watching blockchain smart contract events
 *
 * @param contractType - The type of contract to watch ('token' or 'signalx')
 * @param eventName - The name of the event to watch (typed based on contract ABI)
 * @param options - Additional wagmi useWatchContractEvent options (onLogs, poll, etc.)
 *
 * @example
 * Watching SignalX contract events
 * useBlockchainEvent('signalx', 'BetPlaced', {
 *   onLogs: (logs) => console.log('Bet placed:', logs),
 *   poll: true,
 * });
 *
 * @example
 * Watching Token transfer events
 * useBlockchainEvent('token', 'Transfer', {
 *   onLogs: (logs) => console.log('Transfer:', logs),
 *   args: { from: userAddress },
 * });
 */
export default function useBlockchainEvent(contractType: 'token' | 'signalx', eventName: string, options?: any) {
    const { chainId } = useAccount();
    const { token, contract } = getNetworkConfig(chainId);

    const isToken = contractType === 'token';
    const abi = isToken ? ERC20_ABI : SIGNALX_ABI;
    const address = isToken ? token : contract;

    return useWatchContractEvent({
        address,
        abi,
        eventName,
        watch: true,
        ...options,
    } as any);
}
