'use client';

import type { Round } from '@/types';
import type { ActiveTab, FormDetails } from './types';

export const deriveFormState = (currentRound: Round, activeTab: ActiveTab): FormDetails => {
    if (activeTab === 'start') {
        const timestamp = currentRound.startTime / 1000 || currentRound.createdAt + 60;
        return {
            roundId: currentRound.round,
            price: currentRound.startPrice,
            suggestedPrice: currentRound.startPrice,
            timestamp,
            suggestedTimestamp: timestamp || currentRound.createdAt + 60,
        };
    }

    const endTimestamp = currentRound.endTime / 1000 || currentRound.startTime / 1000 + 60;
    const price = currentRound.endPrice;

    return {
        roundId: currentRound.round,
        price,
        timestamp: endTimestamp,
        suggestedPrice: price,
        suggestedTimestamp: endTimestamp,
    };
};
