'use client';

import { Direction } from '@/types';
import { IoClose } from 'react-icons/io5';
import { cn, formatCurrency } from '@/lib';
import CustomButton from '@/components/ui/CustomButton';
import ConfirmSellModal from './ConfirmSellModal';
import ArrowRightUP from '@/constants/svgs/ArrowRightUP';
import useUserActiveBets from '@/features/trades/hooks/useUserActiveBets';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SellBetModal = () => {
    const { data, summary } = useUserActiveBets();

    if (data.length === 0) return null;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton className="mt-auto mb-2">
                    Sell Bet <ArrowRightUP />
                </CustomButton>
            </DialogTrigger>
            <DialogContent
                showCloseButton={false}
                className="w-full rounded-2xl border-none bg-white p-0 md:max-w-160!"
            >
                <div className="w-full">
                    <SellBetModalHeader />
                    <div className="w-full border-y border-[#E5E8EB] px-6 py-4">
                        <SellBetSummary summary={summary} />
                        <SellBetList bets={data} />
                    </div>
                    <SellBetModalFooter />
                </div>
            </DialogContent>
        </Dialog>
    );
};

function SellBetModalHeader() {
    return (
        <div className="flex h-18 items-center justify-between px-6">
            <DialogTitle>
                <VisuallyHidden>Sell Your Bets</VisuallyHidden>
            </DialogTitle>
            <h3 className="font-primary text-xl leading-7.5 font-medium text-[#202738]">Sell Your Bets</h3>
            <DialogClose className="cursor-pointer">
                <IoClose className="text-xl text-[#7C8593]" />
            </DialogClose>
        </div>
    );
}

function SellBetModalFooter() {
    return (
        <div className="flex h-[3.7rem] w-full items-center justify-center rounded-b-2xl bg-[#FAFBFC]">
            <p className="text-center text-[0.8125rem] leading-[1.21875rem] font-normal text-[#7C8593]">
                You can sell your active bets anytime before the round ends.
            </p>
        </div>
    );
}

function SellBetSummary({ summary }: { summary: any }) {
    return (
        <div className="grid w-full grid-cols-2 gap-4 rounded-[0.75rem] bg-[#F7FAFF] p-5">
            <BetDetails title="Total Bets" value={summary.totalBets} />
            <BetDetails title="Invested Amount" value={formatCurrency(summary.totalBetAmount)} />
            <BetDetails title="Current Value" value={formatCurrency(summary.totalCurrentAmount)} />
            <BetDetails title="P&L" value={formatCurrency(summary.pnl)} pnl={summary.pnl} />
        </div>
    );
}

function SellBetList({ bets }: { bets: any[] }) {
    return (
        <div className="mt-4 max-h-96 space-y-4 overflow-auto">
            {bets.map(bet => (
                <SellBetListItem key={bet.betIndex} bet={bet} />
            ))}
        </div>
    );
}

function SellBetListItem({ bet }: { bet: any }) {
    return (
        <div className="shadow-shadow1 rounded-[0.75rem] border border-[#EAF0FF] bg-white p-4 pt-6">
            <div>
                <div className="flex w-full flex-wrap gap-3">
                    <div className="flex-1">
                        <DirectionBadge direction={bet.direction} />
                    </div>
                    <BetDetails title="Invested" value={formatCurrency(bet.amount)} className="flex-1" />
                    <BetDetails title="Current Value" value={formatCurrency(bet.currentValue)} className="flex-1" />
                    <BetDetails title="P&L" value={formatCurrency(bet.pnl)} pnl={bet.pnl} className="flex-1" />
                </div>
                <div className="mt-[0.81rem] flex w-full justify-end">
                    <ConfirmSellModal bet={bet} market="BTC/USD" />
                </div>
            </div>
        </div>
    );
}

function DirectionBadge({ direction }: { direction: number }) {
    let color = 'bg-gray-400';
    let label = 'N/A';
    if (direction === Direction.UP) {
        color = 'bg-[#00D26A]';
        label = 'Up';
    } else if (direction === Direction.DOWN) {
        color = 'bg-[#FF4D4F]';
        label = 'Down';
    }
    return (
        <div className="mt-[0.67rem] flex items-center gap-2">
            <p className="text-[0.8125rem] leading-[1.21875rem] font-normal text-[#7C8593]">Direction:</p>
            <span
                className={cn(
                    'rounded-sm px-[0.45069rem] py-[0.28125rem] text-xs leading-4.5 font-semibold text-nowrap text-white',
                    color,
                )}
            >
                {label}
            </span>
        </div>
    );
}

export default SellBetModal;

const BetDetails = ({
    title,
    value,
    className,
    pnl,
}: {
    title: string;
    value: string | number;
    className?: string;
    pnl?: number;
}) => {
    let colorClass = '';
    if ((title === 'Overall P&L' || title === 'P&L') && typeof pnl === 'number') {
        if (pnl > 0) colorClass = 'text-[#00D26A]';
        else if (pnl < 0) colorClass = 'text-[#FF4D4F]';
        else colorClass = 'text-gray-400';
    }
    return (
        <div className={cn('space-y-1', className)}>
            <p className="text-[0.8125rem] leading-[1.21875rem] font-normal text-nowrap text-[#7C8593]">{title}</p>
            <p
                className={cn(
                    'text-[1.125rem] leading-6.75 font-semibold',
                    title === 'P&L' || title === 'Overall P&L' ? colorClass : 'text-[#202738]',
                )}
            >
                {value}
            </p>
        </div>
    );
};
