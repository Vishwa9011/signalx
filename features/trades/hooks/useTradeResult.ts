'use client';

import { Direction } from '@/types';
import { useTradeStore } from '@/features/market/store/tradeStore';
import useBlockchainRead from '@/features/web3/hooks/useBlockchainRead';
import { useRoundStore } from '@/features/market/store/roundStore';
import { useEffect } from 'react';
import useRoundPools from '@/features/market/hooks/useRoundPools';

const ResultText = ['LOSE', 'WON', 'DRAW'] as const;
type ResultTextType = (typeof ResultText)[number];

function calculateFee(amount: number, feePercentage: bigint) {
    // feePercentage returned as whole percent (e.g. 1 = 1%)
    return (amount * Number(feePercentage)) / 100;
}

const defaultOutcome = {
    isWon: null as boolean | null,
    amount: 0,
    resultText: 'LOSE' as ResultTextType,
    payout: 0,
    wonPercentage: 0,
};

export default function useTradeResult() {
    const { roundRefetchTrigger } = useRoundStore();
    const { roundId, upBetAmount, downBetAmount } = useTradeStore();
    const feePercentage = useBlockchainRead<bigint>('signalx', 'feePercentage');
    const { data: roundPools } = useRoundPools(roundId);
    const { data, isPending, refetch } = useBlockchainRead('signalx', 'getResult', [BigInt(roundId)], {
        query: {
            enabled: roundId > 0,
        },
    });

    const hasResult = data !== undefined;
    const result = hasResult ? (Number(data) as Direction) : Direction.DEFAULT;
    const isRefunded = result === Direction.DRAW;

    const calculateWonPercentage = (baseAmount: number, grossAmount: number) => {
        if (baseAmount <= 0) return 0;
        return ((grossAmount - baseAmount) / baseAmount) * 100;
    };

    const outcome = (() => {
        if (!hasResult || result === Direction.DEFAULT) return defaultOutcome;

        if (isRefunded) {
            const amount = upBetAmount + downBetAmount;
            const payout = amount - calculateFee(amount, feePercentage.data ?? 0n);
            return {
                ...defaultOutcome,
                amount,
                resultText: 'DRAW' as ResultTextType,
                payout,
                wonPercentage: calculateWonPercentage(amount, payout),
            };
        }

        if (upBetAmount === 0 && downBetAmount === 0) return defaultOutcome;

        const hasUpBet = upBetAmount > 0;
        const hasDownBet = downBetAmount > 0;

        if (result === Direction.UP && hasUpBet && hasDownBet) {
            const payout = roundPools.upMultiplier * upBetAmount;
            return {
                isWon: true,
                amount: upBetAmount,
                resultText: 'WON' as ResultTextType,
                payout,
                wonPercentage: calculateWonPercentage(upBetAmount, payout),
            };
        }

        if (result === Direction.DOWN && hasUpBet && hasDownBet) {
            const payout = roundPools.downMultiplier * downBetAmount;
            return {
                isWon: true,
                amount: downBetAmount,
                resultText: 'WON' as ResultTextType,
                payout,
                wonPercentage: calculateWonPercentage(downBetAmount, payout),
            };
        }

        if (result === Direction.UP && hasUpBet) {
            const payout = roundPools.upMultiplier * upBetAmount;
            return {
                isWon: true,
                amount: upBetAmount,
                resultText: 'WON' as ResultTextType,
                payout,
                wonPercentage: calculateWonPercentage(upBetAmount, payout),
            };
        }

        if (result === Direction.DOWN && hasDownBet) {
            const payout = roundPools.downMultiplier * downBetAmount;
            return {
                isWon: true,
                amount: downBetAmount,
                resultText: 'WON' as ResultTextType,
                payout,
                wonPercentage: calculateWonPercentage(downBetAmount, payout),
            };
        }

        if (result === Direction.UP && hasDownBet) {
            return {
                ...defaultOutcome,
                isWon: false,
                amount: downBetAmount,
                payout: -0, // lost entire bet
                wonPercentage: -100,
            };
        }

        if (result === Direction.DOWN && hasUpBet) {
            return {
                ...defaultOutcome,
                isWon: false,
                amount: upBetAmount,
                payout: -0, // lost entire bet
                wonPercentage: -100,
            };
        }

        return defaultOutcome;
    })();

    useEffect(() => {
        if (roundId > 0) {
            refetch();
        }
    }, [roundId, roundRefetchTrigger, refetch]);

    return {
        data: {
            payout: outcome.payout,
            wonPercentage: outcome.isWon ? outcome.wonPercentage : 0,
            result,
            isWon: outcome.isWon,
            amount: outcome.amount,
            wonAmount: outcome.isWon ? outcome.payout - outcome.amount : 0,
            isRefunded,
            resultText: outcome.resultText,
        },
        isPending,
        refetch,
    };
}
