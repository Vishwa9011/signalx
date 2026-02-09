'use client';

import type { TradeHistory } from '@/types';
import { TradeHistoryRow } from './TradeHistoryRow';

type TradeHistoryTableProps = {
    trades: TradeHistory[];
};

export const TradeHistoryTable = ({ trades }: TradeHistoryTableProps) => {
    return (
        <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-[#F9FBFD] text-sm leading-[1.16069rem] font-semibold text-[#717182]">
                <tr className="border-b border-[#E9EDF5]">
                    <th className="rounded-tl-2xl px-6 py-3 text-left">Market</th>
                    <th className="px-6 py-3 text-left">Direction</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Result</th>
                    <th className="px-6 py-3 text-left">P&amp;L</th>
                    <th className="px-6 py-3 text-left">Round</th>
                    <th className="rounded-tr-2xl px-6 py-3 text-left">Date</th>
                </tr>
            </thead>

            <tbody>
                {trades.map((trade, index) => (
                    <TradeHistoryRow
                        key={`${trade.roundId}-${index}`}
                        trade={trade}
                        index={index}
                        totalRows={trades.length}
                    />
                ))}
            </tbody>
        </table>
    );
};
