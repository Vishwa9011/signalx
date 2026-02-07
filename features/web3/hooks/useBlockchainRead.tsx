'use client';

import type { Config } from 'wagmi';
import { ERC20_ABI } from '@/features/web3/contracts/abi/ERC20';
import { SIGNALX_ABI } from '@/features/web3/contracts/abi/signalx';
import type { ContractFunctionArgs, ContractFunctionName } from 'viem';
import { useReadContract, type UseReadContractParameters } from 'wagmi';
import useNetworkConfig from './useNetworkData';

// Type aliases for contract ABIs
type ERC20Abi = typeof ERC20_ABI;
type SignalXContractAbi = typeof SIGNALX_ABI;

// Utility types for read-only contract functions
type ReadFunctionName<TAbi extends readonly unknown[]> = ContractFunctionName<TAbi, 'pure' | 'view'>;

type ReadFunctionArgs<TAbi extends readonly unknown[], TFunction extends ReadFunctionName<TAbi>> = ContractFunctionArgs<
    TAbi,
    'pure' | 'view',
    TFunction
>;

type ContractReadOptions = Omit<UseReadContractParameters, 'address' | 'abi' | 'functionName' | 'args'>;

/**
 * Hook overload for reading from the SignalX contract
 * Provides type-safe access to SignalX contract view/pure functions
 */
export default function useBlockchainRead<
    TReturn extends unknown,
    TFunction extends ReadFunctionName<SignalXContractAbi> = ReadFunctionName<SignalXContractAbi>,
    TArgs extends ReadFunctionArgs<SignalXContractAbi, TFunction> = ReadFunctionArgs<SignalXContractAbi, TFunction>,
>(
    contractType: 'signalx',
    functionName: TFunction,
    args?: TArgs,
    options?: ContractReadOptions,
): ReturnType<typeof useReadContract<SignalXContractAbi, TFunction, TArgs, Config, TReturn>>;

/**
 * Hook overload for reading from the ERC20 token contract
 * Provides type-safe access to ERC20 token view/pure functions
 */
export default function useBlockchainRead<
    TReturn extends unknown,
    TFunction extends ReadFunctionName<ERC20Abi> = ReadFunctionName<ERC20Abi>,
    TArgs extends ReadFunctionArgs<ERC20Abi, TFunction> = ReadFunctionArgs<ERC20Abi, TFunction>,
>(
    contractType: 'token',
    functionName: TFunction,
    args?: TArgs,
    options?: ContractReadOptions,
): ReturnType<typeof useReadContract<ERC20Abi, TFunction, TArgs, Config, TReturn>>;

/**
 * Custom hook for reading data from blockchain smart contracts
 *
 * @param contractType - The type of contract to read from ('token' or 'signalx')
 * @param functionName - The name of the contract function to call
 * @param args - Optional arguments to pass to the contract function
 * @param options - Additional wagmi useReadContract options
 *
 * @example
 * Reading from Token contract
 * const { data: balance } = useBlockchainRead('token', 'balanceOf', [address]);
 */
export default function useBlockchainRead(
    contractType: 'token' | 'signalx',
    functionName: string,
    args?: readonly unknown[],
    options?: ContractReadOptions,
) {
    const { token, contract } = useNetworkConfig();

    const isTokenContract = contractType === 'token';
    const contractAbi = isTokenContract ? ERC20_ABI : SIGNALX_ABI;
    const contractAddress = isTokenContract ? token : contract;

    return useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName,
        args,
        ...options,
    } as any);
}
