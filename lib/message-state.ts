const MESSAGE_TYPES = [
    'STARTING_NEW_ROUND',
    'BETTING_CLOSED',
    'ROUND_ENDED',
    'DEFAULT',
    'BETTING_OPENED',
    'MINING',
    'DISTRIBUTION_STARTED',
] as const;

export type MessageType = (typeof MESSAGE_TYPES)[number];

export const messageStates: Record<MessageType, { title: string; description: string }> = {
    STARTING_NEW_ROUND: {
        title: 'New Round Starting',
        description: 'New round is starting soon',
    },
    BETTING_OPENED: {
        title: 'Round Live',
        description: 'Betting is now open',
    },
    BETTING_CLOSED: {
        title: 'Betting Closed',
        description: 'Betting is closed',
    },
    MINING: {
        title: 'Mining in Progress',
        description: 'Mining in progress...',
    },
    DISTRIBUTION_STARTED: {
        title: 'Distributing Rewards',
        description: 'Rewards are being distributed',
    },
    ROUND_ENDED: {
        title: 'Round Ended',
        description: 'Round has ended',
    },
    DEFAULT: {
        title: 'Welcome',
        description: 'Awaiting the next round',
    },
};

export const getMessage = (type: MessageType) => messageStates[type];

export const canPlaceBet = (type: MessageType) => {
    return type === 'BETTING_OPENED';
};
