'use client';

import { useState } from 'react';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';
import { BaseError, ContractFunctionRevertedError, type ContractFunctionArgs, type ContractFunctionName } from 'viem';
import { ERC20_ABI } from '@/features/web3/contracts/abi/erc20';
import { SIGNALX_ABI } from '@/features/web3/contracts/abi/signalx';
import useNetworkConfig from './use-network-data';
import { toast } from 'sonner';

/* -----------------------------------
   ✅ Utility Types
----------------------------------- */
type WriteFnName<TAbi extends readonly unknown[]> = ContractFunctionName<TAbi, 'nonpayable' | 'payable'>;
type WriteFnArgs<TAbi extends readonly unknown[], TFn extends WriteFnName<TAbi>> = ContractFunctionArgs<
    TAbi,
    'nonpayable' | 'payable',
    TFn
>;

type UseBlockchainWriteReturn<TAbi extends readonly unknown[], TFn extends WriteFnName<TAbi>> = Omit<
    ReturnType<typeof useWriteContract>,
    'writeContract' | 'writeContractAsync'
> & {
    writeContractAsync: (params?: {
        args?: WriteFnArgs<TAbi, TFn>;
        value?: bigint;
        [key: string]: any;
    }) => Promise<`0x${string}`>;
    lastError?: string | null;
};

/* -----------------------------------
   ⚙️ Error Parser Utility
----------------------------------- */
function parseContractError(error: unknown): string {
    if (!(error instanceof BaseError)) return (error as Error)?.message || 'Unknown error';

    const revertError = error.walk(e => e instanceof ContractFunctionRevertedError);
    if (!(revertError instanceof ContractFunctionRevertedError)) return error.shortMessage || error.message;

    // Extract structured revert data
    const { errorName, args } = revertError.data ?? {};
    const reason = (revertError.data as any)?.reason;
    if (errorName) {
        return args && args.length > 0 ? `${errorName}: ${args.join(', ')}` : errorName;
    }

    if (reason) return reason;

    const message = (revertError as any).message || '';
    const reasonMatch = message.match(/reverted with reason string ['"](.+?)['"]/);
    if (reasonMatch) return reasonMatch[1];

    return 'Contract execution reverted';
}

/* -----------------------------------
   🚀 Main Hook
----------------------------------- */
export default function useBlockchainWrite<TFn extends WriteFnName<typeof ERC20_ABI>>(
    contractType: 'token',
    functionName: TFn,
): UseBlockchainWriteReturn<typeof ERC20_ABI, TFn>;

export default function useBlockchainWrite<TFn extends WriteFnName<typeof SIGNALX_ABI>>(
    contractType: 'signalx',
    functionName: TFn,
): UseBlockchainWriteReturn<typeof SIGNALX_ABI, TFn>;

export default function useBlockchainWrite(
    contractType: 'token' | 'signalx',
    functionName: string,
): UseBlockchainWriteReturn<typeof ERC20_ABI | typeof SIGNALX_ABI, any> {
    const { token, contract } = useNetworkConfig();
    const publicClient = usePublicClient();
    const { address: userAddress } = useAccount();
    const [isWaiting, setIsWaiting] = useState(false);
    const [lastError, setLastError] = useState<string | null>(null);

    const isToken = contractType === 'token';
    const abi = isToken ? ERC20_ABI : SIGNALX_ABI;
    const address = isToken ? token : contract;

    const { writeContractAsync, error, isPending, ...rest } = useWriteContract({
        mutation: {
            onError: err => {
                console.error('⛔ Mutation error:', parseContractError(err));
            },
        },
    });

    const wrappedWriteContractAsync = async (params?: {
        args?: readonly unknown[];
        value?: bigint;
        [key: string]: any;
    }) => {
        try {
            if (publicClient && userAddress) {
                // 🔍 Pre-flight simulation to catch reverts early
                await publicClient.simulateContract({
                    address,
                    abi,
                    functionName: functionName as any,
                    args: params?.args ?? [],
                    value: params?.value,
                    account: userAddress,
                } as any);
            }

            const hash = await writeContractAsync({
                address,
                abi,
                functionName: functionName as any,
                args: params?.args ?? [],
                value: params?.value,
                ...params,
            } as any);

            setIsWaiting(true);
            const receipt = await publicClient?.waitForTransactionReceipt({ hash });
            setIsWaiting(false);

            if (receipt?.status === 'reverted') throw new Error('Transaction reverted by contract');
            return hash;
        } catch (err) {
            const parsed = parseContractError(err);
            setLastError(parsed);
            toast.error(`${parsed}`);
            console.error('❌ Contract Error:', parsed);
            throw new Error(parsed);
        }
    };

    return {
        error,
        lastError,
        isPending: isPending || isWaiting,
        writeContractAsync: wrappedWriteContractAsync,
        ...rest,
    };
}
