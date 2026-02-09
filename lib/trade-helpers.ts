import { Direction, TradeStatus } from '@/types';

// ============================================================================
// BET CALCULATIONS
// ============================================================================

/**
 * Calculates betting percentages for up and down pools
 * @param upTotal - Total amount bet on UP
 * @param downTotal - Total amount bet on DOWN
 * @returns Percentages for each direction
 */
export const calcBetPercentage = (upTotal: number, downTotal: number) => {
    const total = upTotal + downTotal;
    if (total === 0) {
        return { upPercent: 0, downPercent: 0 };
    }
    const upPercent = Math.round((upTotal / total) * 100);
    const downPercent = Math.round((downTotal / total) * 100);
    return { upPercent, downPercent };
};

/**
 * Calculates betting window duration in minutes
 * @param startTimeMs - Start time in milliseconds
 * @param endTimeMs - End time in milliseconds
 * @returns Duration in minutes (defaults to 3 if invalid)
 */
export const calcBettingWindowInMin = (startTimeMs: number, endTimeMs: number) => {
    const timeDiff = endTimeMs - startTimeMs;
    if (timeDiff > 0) {
        return timeDiff / (60 * 1000);
    }
    return 3;
};

// ============================================================================
// TRADE HISTORY DISPLAY
// ============================================================================

/**
 * Converts direction number to readable text
 * @param direction - Direction enum value
 * @returns "Up" or "Down"
 */
export const getDirectionText = (direction: Direction): string => {
    switch (direction) {
        case Direction.UP:
            return 'Up';
        case Direction.DOWN:
            return 'Down';
        case Direction.DRAW:
            return 'Draw';
        default:
            return 'Unknown';
    }
};

/**
 * Converts trade status to readable result text
 * @param status - TradeStatus enum value
 * @returns Human-readable status string
 */
export const getTradeStatusText = (status: TradeStatus): string => {
    switch (status) {
        case TradeStatus.ACTIVE:
            return 'Pending';
        case TradeStatus.WON:
            return 'Won';
        case TradeStatus.LOST:
            return 'Lost';
        case TradeStatus.REFUNDED:
            return 'Refunded';
        case TradeStatus.SOLD:
            return 'Sold';
        default:
            return 'Unknown';
    }
};

/**
 * Calculates profit/loss for display
 * @param status - Trade status
 * @param amount - Bet amount
 * @param payout - Payout amount
 * @returns Formatted P&L string with sign
 */
export const calculatePnL = (status: number, amount: number, payout: number): string => {
    // For pending trades, P&L is not yet determined
    if (status === TradeStatus.ACTIVE) return '$0.00';

    // Calculate actual profit/loss: payout - amount
    const profitLoss = payout - amount;

    // Format with sign based on whether it's profit or loss
    if (profitLoss > 0) {
        return `+$${profitLoss.toFixed(2)}`;
    } else if (profitLoss < 0) {
        return `-$${Math.abs(profitLoss).toFixed(2)}`;
    } else {
        return '$0.00';
    }
};

/**
 * Determines trade status flags for UI display
 * @param status - Trade status
 * @param amount - Bet amount
 * @param payout - Payout amount
 * @returns Object with boolean flags for different states
 */
export const getTradeStatus = (status: number, amount: number, payout: number) => {
    const isPending = status === TradeStatus.ACTIVE;
    const isRefunded = status === TradeStatus.REFUNDED;

    // Determine profit/loss based on actual payout vs amount, not just status
    const profitLoss = payout - amount;
    const isProfit = profitLoss > 0;
    const isLoss = profitLoss < 0;

    return {
        isWin: isProfit && !isPending && !isRefunded,
        isLoss: isLoss && !isPending && !isRefunded,
        isPending,
        isRefunded,
    };
};

export const getPnLSign = (pnl: number): string => {
    if (pnl > 0) return '+';
    if (pnl < 0) return '-';
    return '';
};
