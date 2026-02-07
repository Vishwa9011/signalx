import { formatUnits } from 'viem';
import type { Bet, Round, TradeHistory, ActiveBet, UserStats } from '@/types';

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

/**
 * Converts various value types (string, number, bigint) to a JavaScript number
 * @param value - The value to convert (string, number, or bigint)
 * @param decimals - Required when converting bigint (token decimals)
 * @returns The numeric representation of the value
 */
export const convertToNumber = (value: string | number | bigint, decimals?: number): number => {
    if (typeof value === 'bigint') {
        if (typeof decimals !== 'number') {
            throw new Error('Decimals must be provided when converting bigint values');
        }
        const formattedValue = formatUnits(value, decimals);
        return Number(formattedValue);
    }

    if (typeof value === 'string' || typeof value === 'number') {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            throw new Error('Invalid number format: value cannot be converted to a number');
        }
        return numericValue;
    }

    throw new Error('Unsupported value type: must be a string, number, or bigint');
};

/**
 * Format a number as USD currency
 * @param value - The number to format
 * @param maximumFractionDigits - Maximum number of decimal places (default: 2)
 * @returns Formatted currency string or empty string if value is null/undefined
 */
export const formatCurrency = (value: number | null | undefined, maximumFractionDigits: number = 2): string => {
    if (value == null) return '';

    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits,
    });
};

export type TimeFormat = 'short' | 'long';

export function formatSeconds(valueInSeconds: number, format: TimeFormat): string {
    // Convert SECONDS → milliseconds for consistent calculations
    const ms = valueInSeconds * 1000;

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    if (format === 'short') {
        return `${mm}:${ss}`;
    }

    // long format → "00 mins 00 secs"
    return `${mm} mins ${ss} secs`;
}

// ============================================================================
// TIME FORMATTING
// ============================================================================

/**
 * Formats a timestamp to a localized time string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string (HH:MM AM/PM)
 */
export const formatTime = (timestamp: number): string => {
    try {
        const date = new Date(timestamp);

        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    } catch (error) {
        console.error('Error formatting time:', error);
        return '--:--';
    }
};

// ============================================================================
// DATA FORMATTING (Blockchain to Frontend)
// ============================================================================

/**
 * Formats raw blockchain round data to frontend-friendly format
 */
export function formatRoundData(rawRoundData: Round<bigint>, tokenDecimals: number): Round {
    return {
        round: Number(rawRoundData.round),
        startPrice: Number(rawRoundData.startPrice) / 10000,
        endPrice: Number(rawRoundData.endPrice) / 10000,
        minBetAmount: convertToNumber(rawRoundData.minBetAmount, tokenDecimals),
        maxBetAmount: convertToNumber(rawRoundData.maxBetAmount, tokenDecimals),
        totalPool: convertToNumber(rawRoundData.totalPool, tokenDecimals),
        upPool: convertToNumber(rawRoundData.upPool, tokenDecimals),
        downPool: convertToNumber(rawRoundData.downPool, tokenDecimals),
        result: Number(rawRoundData.result),
        startTime: Number(rawRoundData.startTime) * 1000,
        endTime: Number(rawRoundData.endTime) * 1000,
        distributedCount: Number(rawRoundData.distributedCount),
        totalDistributed: convertToNumber(rawRoundData.totalDistributed, tokenDecimals),
        betsLimit: Number(rawRoundData.betsLimit),
        created: rawRoundData.created,
        createdAt: Number(rawRoundData.createdAt),
    } as Round;
}

/**
 * Formats raw blockchain user stats data
 */
export function formatUserStats(rawUserStats: UserStats<bigint>, tokenDecimals: number): UserStats {
    return {
        user: rawUserStats.user,
        totalBets: Number(rawUserStats.totalBets),
        totalWins: Number(rawUserStats.totalWins),
        totalAmountBet: convertToNumber(rawUserStats.totalAmountBet, tokenDecimals),
        totalAmountWon: convertToNumber(rawUserStats.totalAmountWon, tokenDecimals),
        exists: rawUserStats.exists,
    } as UserStats;
}

/**
 * Formats an array of user stats for leaderboard
 */
export function formatLeaderboard(rawUserStats: UserStats<bigint>[], tokenDecimals: number): UserStats[] {
    return rawUserStats.map(userStat => formatUserStats(userStat, tokenDecimals));
}

/**
 * Formats a single bet from blockchain data
 */
export function formatBet(rawBetData: Bet<bigint>, tokenDecimals: number): Bet {
    return {
        user: rawBetData.user,
        tradeIndex: Number(rawBetData.tradeIndex),
        amount: convertToNumber(rawBetData.amount, tokenDecimals),
        direction: Number(rawBetData.direction),
        sold: rawBetData.sold,
        sellAmount: convertToNumber(rawBetData.sellAmount, tokenDecimals),
        entryMultiplier: convertToNumber(rawBetData.entryMultiplier, 18), // assuming multiplier has 18 decimals
    } as Bet;
}

/**
 * Formats multiple bets and categorizes them by direction (up/down)
 */
export function formatAndCategorizeBets(
    rawBetData: Bet<bigint>[],
    tokenDecimals: number,
): { upBets: Bet[]; downBets: Bet[] } {
    const formattedBets = rawBetData.map(bet => formatBet(bet, tokenDecimals));

    return formattedBets.reduce(
        (acc: any, bet) => {
            if (bet.direction === 1) {
                acc.upBets.push(bet);
            } else if (bet.direction === 2) {
                acc.downBets.push(bet);
            }
            return acc;
        },
        {
            upBets: [] as Bet[],
            downBets: [] as Bet[],
        },
    );
}

export function formatActiveBet(rawBet: ActiveBet<bigint>, tokenDecimals: number) {
    return {
        tradeIndex: Number(rawBet.tradeIndex),
        betIndex: Number(rawBet.betIndex),
        user: rawBet.user,
        amount: convertToNumber(rawBet.amount, tokenDecimals),
        direction: Number(rawBet.direction),
        sold: rawBet.sold,
        sellAmount: convertToNumber(rawBet.sellAmount, tokenDecimals),
        entryMultiplier: convertToNumber(rawBet.entryMultiplier, 18),
        currentMultiplier: convertToNumber(rawBet.currentMultiplier, 18),
        currentValue: convertToNumber(rawBet.currentValue, tokenDecimals),
        pnl: convertToNumber(rawBet.currentValue, tokenDecimals) - convertToNumber(rawBet.amount, tokenDecimals),
    } as ActiveBet;
}

export function formatActiveBets(rawBets: ActiveBet<bigint>[], tokenDecimals: number) {
    return rawBets.map(bet => formatActiveBet(bet, tokenDecimals));
}

/**
 * Formats a single trade history entry
 */
export function formatTrade(rawTrade: TradeHistory<bigint>, tokenDecimals: number): TradeHistory {
    return {
        roundId: Number(rawTrade.roundId),
        amount: convertToNumber(rawTrade.amount, tokenDecimals),
        result: Number(rawTrade.result),
        direction: Number(rawTrade.direction),
        endPrice: Number(rawTrade.endPrice) / 10000,
        startPrice: Number(rawTrade.startPrice) / 10000,
        entryMultiplier: convertToNumber(rawTrade.entryMultiplier, 18),
        payout: convertToNumber(rawTrade.payout, tokenDecimals),
        betIndex: Number(rawTrade.betIndex),
        status: Number(rawTrade.status),
        timestamp: Number(rawTrade.timestamp) * 1000,
    } as TradeHistory;
}

/**
 * Formats an array of trade history entries
 */
export function formatTradeHistory(rawTrades: any[], decimals: number): TradeHistory[] {
    return rawTrades.map(trade => formatTrade(trade, decimals));
}

export function formatRoundPoolData(rawPoolData: any, tokenDecimals: number) {
    return {
        totalPool: convertToNumber(rawPoolData[0], tokenDecimals),
        upPool: convertToNumber(rawPoolData[1], tokenDecimals),
        downPool: convertToNumber(rawPoolData[2], tokenDecimals),
        upMultiplier: convertToNumber(rawPoolData[3], 18),
        downMultiplier: convertToNumber(rawPoolData[4], 18),
    };
}
