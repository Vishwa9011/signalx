import type { Address } from 'viem';

/**
 * @property DEFAULT - 0
 * @property UP - 1
 * @property DOWN - 2
 * @property DRAW - 3
 */
export const Direction = {
    DEFAULT: 0,
    UP: 1,
    DOWN: 2,
    DRAW: 3,
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

/**
 * @property ACTIVE - 0 - Bet placed, round not ended yet
 * @property WON - 1 - User won the round
 * @property LOST - 2 - User lost the round
 * @property REFUNDED - 3 - Draw or no opposition, bet refunded
 * @property SOLD - 4 - Early exit
 */
export const TradeStatus = {
    ACTIVE: 0,
    WON: 1,
    LOST: 2,
    REFUNDED: 3,
    SOLD: 4,
} as const;

export type TradeStatus = (typeof TradeStatus)[keyof typeof TradeStatus];

export interface NewRound {
    minBetAmount: number;
    maxBetAmount: number;
    startTime: number;
    endTime: number;
    betsLimit: number;
}

export interface Round<T extends unknown = number> {
    round: T;
    startPrice: T;
    endPrice: T;
    minBetAmount: T;
    maxBetAmount: T;
    totalPool: T;
    upPool: T;
    downPool: T;
    result: Direction;
    startTime: T;
    endTime: T;
    distributedCount: T;
    totalDistributed: T;
    betsLimit: T;
    created: boolean;
    createdAt: T;
}

export interface Bet<T extends unknown = number> {
    user: Address;
    amount: T;
    tradeIndex: T;
    direction: Direction;
    sold: boolean;
    sellAmount: T;
    entryMultiplier: T;
}

export interface UserStats<T extends unknown = number> {
    user: Address;
    totalBets: T;
    totalWins: T;
    totalAmountBet: T;
    totalAmountWon: T;
    exists: boolean;
}

export interface Distribution {
    projectFee: number;
    netPool: number;
    pendingDistribution: number;
}

export interface DistributionResult {
    user: Address;
    amount: number;
}

export interface TradeHistory<T extends unknown = number> {
    roundId: T;
    amount: T;
    betIndex: T;
    result: Direction;
    direction: Direction;
    entryMultiplier: T;
    timestamp: T;
    status: TradeStatus;
    payout: T;
    startPrice: T;
    endPrice: T;
}

export interface ActiveBet<T extends unknown = number> {
    tradeIndex: T;
    betIndex: T;
    user: Address;
    amount: T;
    direction: Direction;
    sold: boolean;
    sellAmount: T;
    entryMultiplier: T;
    currentMultiplier: T;
    currentValue: T;
    pnl: T;
}

export type RoundBets = {
    upBets: Bet[];
    downBets: Bet[];
};

export type RoundPools = {
    totalPool: number;
    upPool: number;
    downPool: number;
    upMultiplier: number;
    downMultiplier: number;
};
