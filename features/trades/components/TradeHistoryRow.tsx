'use client';

import { cn } from '@/lib/utils';
import { Direction, type TradeHistory } from '@/types';
import { getDirectionText, getTradeStatusText, calculatePnL } from '@/lib/trade.helpers';

type TradeHistoryRowProps = {
    trade: TradeHistory;
    index: number;
    totalRows: number;
};

export const TradeHistoryRow = ({ trade, index, totalRows }: TradeHistoryRowProps) => {
    const directionText = getDirectionText(trade.direction);
    const resultText = getTradeStatusText(trade.status);
    const pnlText = calculatePnL(trade.status, trade.amount, trade.payout);

    // For result badge - based on trade status
    const isWon = trade.status === 1 || trade.status === 4; // WON or SOLD
    const isLost = trade.status === 2; // LOST
    const isPendingStatus = trade.status === 0; // PENDING
    const isRefundedStatus = trade.status === 3; // REFUNDED

    // For P&L color - based on actual profit/loss
    const profitLoss = trade.payout - trade.amount;
    const isPnLProfit = profitLoss > 0;
    const isPnLLoss = profitLoss < 0;

    const isFirstRow = index === 0;
    const isLastRow = index === totalRows - 1;
    const isEvenRow = index % 2 === 0;

    return (
        <tr
            key={`${trade.roundId}-${index}`}
            className={cn(
                isEvenRow ? 'bg-white' : 'bg-[#F9FBFF]',
                !isLastRow && 'border-b border-[#E9EDF5]',
                isFirstRow && 'rounded-t-2xl',
                isLastRow && 'rounded-b-2xl',
            )}
        >
            {/* Market */}
            <td
                className={cn(
                    'px-6 py-3 text-sm leading-5 font-semibold text-[#030213]',
                    isLastRow && 'rounded-bl-2xl',
                )}
            >
                BTC/USD
            </td>

            {/* Direction */}
            <td className="px-6 py-3 text-sm leading-5 font-normal text-[#717182]">
                <span
                    className={cn(
                        'inline-block w-14 rounded-full px-2 py-1 text-center text-xs font-medium',
                        trade.direction === Direction.UP ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    )}
                >
                    {directionText}
                </span>
            </td>

            {/* Amount */}
            <td className="px-6 py-3 text-sm leading-5 font-normal text-[#030213]">${trade.amount.toFixed(2)}</td>

            {/* Result */}
            <td className="px-6 py-3 text-sm leading-5 font-normal">
                <span
                    className={cn(
                        'inline-block min-w-14 rounded-full px-2 py-1 text-center text-xs font-medium',
                        isWon && 'bg-green-100 text-green-800',
                        isLost && 'bg-red-100 text-red-800',
                        isPendingStatus && 'bg-yellow-100 text-yellow-800',
                        isRefundedStatus && 'bg-blue-100 text-blue-800',
                    )}
                >
                    {resultText}
                </span>
            </td>

            {/* P&L */}
            <td
                className={cn(
                    'px-6 py-3 text-sm leading-5 font-semibold',
                    isPnLProfit && 'text-[#10B981]',
                    isPnLLoss && 'text-[#EF4444]',
                    isPendingStatus && 'text-[#F59E0B]',
                    isRefundedStatus && 'text-[#717182]',
                )}
            >
                {pnlText}
            </td>

            {/* Round */}
            <td className="px-6 py-3 text-sm leading-5 font-normal text-[#717182]">#{trade.roundId}</td>

            {/* Date */}
            <td
                className={cn(
                    'px-6 py-3 text-sm leading-5 font-normal text-nowrap text-[#717182]',
                    isLastRow && 'rounded-br-2xl',
                )}
            >
                {new Date(trade.timestamp).toLocaleString()}
            </td>
        </tr>
    );
};
