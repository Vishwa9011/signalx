import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TradeStore = {
    roundId: number;
    upBetAmount: number;
    downBetAmount: number;
    addAmountInUp: (roundId: number, amount: number) => void;
    addAmountInDown: (roundId: number, amount: number) => void;
    clearData: () => void;
};

export const useTradeStore = create<TradeStore>()(
    persist(
        set => ({
            roundId: 0,
            upBetAmount: 0,
            downBetAmount: 0,
            addAmountInUp: (roundId: number, amount: number) =>
                set(state => ({
                    roundId,
                    upBetAmount: state.upBetAmount + amount,
                })),

            addAmountInDown: (roundId: number, amount: number) =>
                set(() => ({
                    roundId,
                    downBetAmount: amount,
                })),

            clearData: () =>
                set(() => ({
                    roundId: 0,
                    upBetAmount: 0,
                    downBetAmount: 0,
                })),
        }),
        {
            name: 'trade-store',
        },
    ),
);
