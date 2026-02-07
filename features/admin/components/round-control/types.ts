'use client';

import type { Round } from '@/types';

export type ActiveTab = 'start' | 'end';

export type FormDetails = {
    roundId: number;
    price: number;
    timestamp: number;
    suggestedPrice: number;
    suggestedTimestamp: number;
};

export type RoundControlFormProps = {
    isRoundId: boolean;
    round: Round;
    onResolve: () => void;
};
