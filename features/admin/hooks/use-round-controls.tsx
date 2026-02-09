'use client';

import { toast } from 'sonner';
import { parseUnits } from 'viem';
import { useCallback } from 'react';
import useNetworkConfig from '@/features/web3/hooks/use-network-data';
import { useRoundStore } from '@/features/market/store/round-store';
import useBlockchainWrite from '@/features/web3/hooks/use-blockchain-write';

export const ROUND_DURATION = 60;

export default function useRoundControls() {
    const { decimals } = useNetworkConfig();
    const { triggerRoundRefetch } = useRoundStore();
    const endWrite = useBlockchainWrite('signalx', 'endRound');
    const startWrite = useBlockchainWrite('signalx', 'startRound');
    const createWrite = useBlockchainWrite('signalx', 'createRound');

    const handleCreate = useCallback(async () => {
        const toastId = toast.loading('Creating round...');
        try {
            await createWrite.writeContractAsync({
                args: [
                    {
                        minBetAmount: parseUnits('1', decimals),
                        maxBetAmount: parseUnits('1000', decimals),
                        betsLimit: 100n,
                    },
                ],
            });
            triggerRoundRefetch();
            toast.success('New round created!', { id: toastId });
        } catch (error) {
            toast.dismiss(toastId);
        }
    }, [createWrite, decimals]);

    const handleStart = useCallback(
        async (roundId: number, price: number, timestamp: number) => {
            const toastId = toast.loading('Starting round...');
            try {
                await startWrite.writeContractAsync({
                    args: [
                        BigInt(roundId),
                        {
                            startPrice: BigInt(price),
                            startTime: BigInt(timestamp),
                            endTime: BigInt(timestamp + ROUND_DURATION),
                        },
                    ],
                });
                triggerRoundRefetch();
                toast.success('New round started!', { id: toastId });
            } catch (err) {
                toast.dismiss(toastId);
            }
        },
        [decimals, startWrite],
    );

    const handleEnd = useCallback(
        async (roundId: number, price: number) => {
            const toastId = toast.loading('Ending round...');
            try {
                await endWrite.writeContractAsync({
                    args: [BigInt(roundId), BigInt(price), 20n],
                });
                triggerRoundRefetch();
                toast.success('Round ended!', { id: toastId });
            } catch (err) {
                toast.dismiss(toastId);
            }
        },
        [endWrite],
    );

    return {
        createRound: handleCreate,
        startRound: handleStart,
        endRound: handleEnd,
        isPending: startWrite.isPending || endWrite.isPending || createWrite.isPending,
    };
}
