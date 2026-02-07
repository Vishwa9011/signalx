'use client';

import { getMessage, type MessageType } from '@/lib';
import { useRoundStore } from '@/features/market/store/roundStore';

const transitionStates = [
    'STARTING_NEW_ROUND',
    'BETTING_OPENED',
    'BETTING_CLOSED',
    'MINING',
    'DISTRIBUTION_STARTED',
    'ROUND_ENDED',
] as MessageType[];

const RoundMessageUpdates = () => {
    const { currentState } = useRoundStore();
    const isTransitioning = transitionStates.includes(currentState);
    const message = getMessage(currentState);
    if (!isTransitioning) return null;

    return (
        <div className="l:left-10 absolute top-10 left-5 w-max p-4">
            <p className="l:text-2xl mt-2 animate-pulse text-xl font-extrabold text-slate-600">{message.description}</p>
        </div>
    );
};

export default RoundMessageUpdates;
