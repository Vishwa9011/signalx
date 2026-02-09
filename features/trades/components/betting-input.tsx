'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import { Direction } from '@/types';
import GoesUp from '@/constants/svgs/goes-up';
import { parseUnits, maxUint256 } from 'viem';
import GoesDown from '@/constants/svgs/goes-down';
import { useRoundStore } from '@/features/market/store/round-store';
import useNetworkConfig from '@/features/web3/hooks/use-network-data';
import useBlockchainRead from '@/features/web3/hooks/use-blockchain-read';
import useBlockchainWrite from '@/features/web3/hooks/use-blockchain-write';
import { useTradeStore } from '@/features/market/store/trade-store';
import { cn } from '@/lib';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

const betAmountNumber = [1, 2, 5, 10, 25];
const SUCCESS_TOAST_DURATION = 3000;

/**
 * Validates and updates user trade information based on blockchain round data
 */
const syncUserTradeWithBlockchainRound = (currentRound: number, amount: number, direction: Direction) => {
    if (currentRound === 0) return;

    const { roundId, addAmountInUp, addAmountInDown, clearData } = useTradeStore.getState();

    // Clear stale trades if round has changed
    if (currentRound !== roundId) {
        clearData();
    }

    // Update trade data with new bet
    if (direction === Direction.UP) {
        addAmountInUp(currentRound, amount);
    } else {
        addAmountInDown(currentRound, amount);
    }
};

type BettingInputProps = {
    className?: string;
};

const BettingInput = ({ className }: BettingInputProps) => {
    const { open } = useAppKit();
    const { isConnected } = useAppKitAccount();
    const { decimals } = useNetworkConfig();
    const [betAmount, setBetAmount] = useState('');
    const { round, triggerRoundRefetch, roundPools, currentState } = useRoundStore();
    const [isProcessingTrade, setIsProcessingTrade] = useState(false);

    const { address: walletAddress } = useAccount();
    const { contract: signalxContractAddress } = useNetworkConfig();

    const tokenAllowance = useBlockchainRead<bigint>('token', 'allowance', [
        walletAddress as Address,
        signalxContractAddress,
    ]);
    const { writeContractAsync: executeApproval, isPending: isApprovalPending } = useBlockchainWrite(
        'token',
        'approve',
    );
    const { writeContractAsync: executeTradeTransaction, isPending: isTradePending } = useBlockchainWrite(
        'signalx',
        'placeBet',
    );

    // Validation helpers
    const isValidBetAmount = (value: string): boolean => {
        return !!value && parseFloat(value) > 0;
    };

    const validateTradeInputs = (): boolean => {
        if (!isValidBetAmount(betAmount)) {
            toast.error('Please enter a valid amount');
            return false;
        }

        if (!walletAddress) {
            toast.error('Please connect your wallet');
            return false;
        }

        return true;
    };

    // Input handler
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const decimalNumberRegex = /^\d*\.?\d*$/;

        if (decimalNumberRegex.test(inputValue)) {
            setBetAmount(inputValue);
        }
    };

    // Token approval handler
    const ensureTokenApproval = async (requiredAmountInWei: bigint): Promise<boolean> => {
        const currentAllowance = tokenAllowance.data || 0n;
        if (currentAllowance >= requiredAmountInWei) return true;
        const approvalToastId = toast.loading('🔓 Approving tokens for unlimited trading...');

        try {
            await executeApproval({
                args: [signalxContractAddress, maxUint256],
            });
            toast.success('✅ Tokens approved!', { id: approvalToastId, duration: SUCCESS_TOAST_DURATION });
            tokenAllowance.refetch();
            return true;
        } catch {
            toast.dismiss(approvalToastId);
            return false;
        }
    };

    // Trade execution handler
    const submitTrade = async (direction: Direction, amount: bigint): Promise<boolean> => {
        const directionLabel = direction === 1 ? '📈 UP' : '📉 DOWN';
        const tradeToastId = toast.loading(`⏳ Placing ${directionLabel} trade...`);

        try {
            await executeTradeTransaction({
                args: [BigInt(round.round), amount, direction],
            });

            const successMessage = `🎉 Trade confirmed! ${direction === Direction.UP ? '📈 Goes UP' : '📉 Goes DOWN'}`;
            toast.success(successMessage, { id: tradeToastId });
            return true;
        } catch {
            toast.error('❌ Trade Failed', { id: tradeToastId });
            return false;
        } finally {
            toast.dismiss(tradeToastId);
        }
    };

    // Main bet handler
    const handlePlaceBet = (direction: Direction) => async () => {
        if (!validateTradeInputs()) return;

        setIsProcessingTrade(true);

        const tradeAmountInWei = parseUnits(betAmount, decimals);
        const isApproved = await ensureTokenApproval(tradeAmountInWei);

        if (!isApproved) {
            setIsProcessingTrade(false);
            return;
        }

        const tradeSuccessful = await submitTrade(direction, tradeAmountInWei);

        if (tradeSuccessful) {
            setBetAmount('');
            syncUserTradeWithBlockchainRound(round.round, Number(betAmount), direction);
        }

        triggerRoundRefetch();
        setIsProcessingTrade(false);
    };

    // UI state
    const isAnyOperationPending = isApprovalPending || isTradePending || isProcessingTrade;
    const isTradingEnabled = currentState === 'BETTING_OPENED' && round.startPrice === 0 && round.endPrice === 0;

    // Button labels
    const getButtonLabel = () => {
        if (isApprovalPending) return 'Approving...';
        if (isTradePending) return 'Trading...';
        return null;
    };

    const buttonLabel = getButtonLabel();

    return (
        <>
            <div
                className={cn(
                    'sticky bottom-0 left-0 flex flex-col gap-1.5 rounded-[0.625rem] bg-[#F0F5FF] p-3 pb-5 sm:static sm:bg-white md:gap-3',
                    className,
                )}
            >
                {currentState !== 'BETTING_OPENED' && <p className="mt-auto text-sm">Please wait for new round.</p>}
                <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Enter Amount in USD"
                    value={betAmount}
                    onChange={handleAmountChange}
                    className="h-12 w-full rounded-2xl border border-[#0000000D] bg-[#0000000D] px-4 text-base text-[0.875rem] text-black outline-none"
                />

                {isConnected ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePlaceBet(Direction.UP)}
                            disabled={isAnyOperationPending || !isTradingEnabled}
                            className="font_dmSans click relative flex h-11 w-full items-center justify-center gap-1.5 overflow-hidden rounded-[0.75rem] bg-[#13C591] px-4 py-[0.62rem] text-base leading-6 font-bold text-nowrap text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {buttonLabel || 'Goes up'}
                            {roundPools.upMultiplier > 0 && <> ({roundPools.upMultiplier.toFixed(2)}x)</>} <GoesUp />
                        </button>

                        <button
                            onClick={handlePlaceBet(Direction.DOWN)}
                            disabled={isAnyOperationPending || !isTradingEnabled}
                            className="font_dmSans click relative flex h-11 w-full items-center justify-center gap-1.5 overflow-hidden rounded-[0.75rem] bg-[#D12727] px-4 py-[0.62rem] text-base leading-6 font-bold text-nowrap text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {buttonLabel || 'Goes down'}
                            {roundPools.downMultiplier > 0 && <> ({roundPools.downMultiplier.toFixed(2)}x)</>}{' '}
                            <GoesDown />
                        </button>
                    </div>
                ) : (
                    <div className="flex w-full items-center">
                        <button
                            onClick={() => {
                                open();
                            }}
                            className="font_dmSans click flex w-full cursor-pointer items-center justify-center rounded-[0.75rem] bg-[#1549B3] px-6 py-4 text-sm leading-[1.00625rem] font-medium tracking-[0.02188rem] text-white"
                        >
                            Connect Wallet
                        </button>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    {betAmountNumber.map((bet, index) => (
                        <button
                            key={index}
                            onClick={() => setBetAmount(String(bet))}
                            className="font-tertiary click l:bg-[#F5F5F5] w-full rounded-[0.625rem] bg-[#E2E6F0] px-[1.24rem] py-3 text-center text-sm leading-5.25 font-medium text-[#202738]"
                        >
                            ${bet}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BettingInput;
