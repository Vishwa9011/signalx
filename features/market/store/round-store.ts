import { create } from 'zustand';
import type { Round, RoundBets, RoundPools } from '@/types';
import { Direction } from '@/types/contract.types';
import type { MessageType } from '@/lib/message-state';

const DEFAULT_ROUND: Round = {
    round: 0,
    startPrice: 0,
    endPrice: 0,
    minBetAmount: 0,
    maxBetAmount: 0,
    totalPool: 0,
    upPool: 0,
    downPool: 0,
    result: Direction.DEFAULT,
    startTime: 0,
    endTime: 0,
    distributedCount: 0,
    totalDistributed: 0,
    betsLimit: 0,
    created: false,
    createdAt: 0,
};

const DEFAULT_ROUND_POOL: RoundPools = {
    totalPool: 0,
    upPool: 0,
    downPool: 0,
    upMultiplier: 0,
    downMultiplier: 0,
};

// TradeStore: Zustand store for trading state management
export type TradeStore = {
    round: Round;
    countdownTime: number;
    roundPools: RoundPools;
    roundBets: RoundBets;
    currentRoundId: number;
    currentState: MessageType;
    isNewRoundLoading: boolean;
    roundRefetchTrigger: number;
    setCurrentState: (state: MessageType) => void;
    setRound: (round: Round) => void;
    updateRound: (round: Partial<Round>) => void;
    triggerRoundRefetch: () => void;
    setRoundBets: (bets: RoundBets) => void;
    updateCurrentRoundId: (roundId: number) => void;
    setRoundPools: (pools: RoundPools) => void;
    setCountdownTime: (time: number) => void;
};

export const useRoundStore = create<TradeStore>()(set => ({
    round: DEFAULT_ROUND,
    roundPools: DEFAULT_ROUND_POOL,
    roundBets: { upBets: [], downBets: [] },
    currentRoundId: 0,
    countdownTime: 0,
    currentState: 'DEFAULT' as MessageType,
    isNewRoundLoading: false,
    roundRefetchTrigger: 0,
    setRoundBets: bets => set({ roundBets: bets }),
    setCurrentState: state => set({ currentState: state }),
    setRound: round => set({ round, currentRoundId: round.round }),
    updateRound: round =>
        set(s => {
            const newRound = { ...s.round, ...round };
            return { round: newRound, currentRoundId: newRound.round };
        }),
    triggerRoundRefetch: () => set(s => ({ roundRefetchTrigger: s.roundRefetchTrigger + 1 })),
    updateCurrentRoundId: roundId => set({ currentRoundId: roundId }),
    setRoundPools: pools => set({ roundPools: pools }),
    setCountdownTime: time => set({ countdownTime: time }),
}));
