'use client';

import React from 'react';
import { toast } from 'sonner';
import type { ActiveBet } from '@/types';
import { Direction } from '@/types';
import { IoClose } from 'react-icons/io5';
import { cn, formatCurrency } from '@/lib';
import CustomButton from '@/components/ui/CustomButton';
import { useRoundStore } from '@/features/market/store/roundStore';
import useBlockchainWrite from '@/features/web3/hooks/useBlockchainWrite';
import OutlineExclamationCircle from '@/constants/svgs/OutlineExclamationCircle';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/shared/animate-ui/components/radix/dialog';
import { DialogTitle } from '@/components/shared/animate-ui/primitives/radix/dialog';

type ConfirmSellModalProps = {
    bet: ActiveBet;
    market?: string;
};

const directionLabelAndColor = (direction: number) => {
    if (direction === Direction.UP) return { label: 'Up', color: 'bg-[#00D26A]' };
    if (direction === Direction.DOWN) return { label: 'Down', color: 'bg-[#FF4D4F]' };
    return { label: 'N/A', color: 'bg-gray-400' };
};

const ConfirmSellModal = ({ bet, market = '' }: ConfirmSellModalProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { currentRoundId } = useRoundStore();
    const sellBet = useBlockchainWrite('signalx', 'sellPosition');
    const [isSelling, setIsSelling] = React.useState(false);
    const handleSell = async () => {
        const toastId = toast.loading('Selling your bet...');
        setIsSelling(true);
        try {
            await sellBet.writeContractAsync({
                args: [BigInt(currentRoundId), BigInt(bet.betIndex)],
            });
            toast.success('Bet sold successfully!', { id: toastId });
            setIsOpen(false);
        } catch (error) {
            toast.dismiss(toastId);
        } finally {
            setIsSelling(false);
        }
    };
    const { label: directionLabel, color: directionColor } = directionLabelAndColor(bet.direction);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <CustomButton className="w-fit rounded-xl px-10" onClick={() => setIsOpen(true)}>
                    Sell Now
                </CustomButton>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="w-full rounded-2xl border-none bg-white p-0">
                <div className="w-full p-5">
                    <DialogTitle>
                        <div className="flex items-center justify-end">
                            <DialogClose className="cursor-pointer">
                                <IoClose className="text-xl text-[#7C8593]" />
                            </DialogClose>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3">
                            <OutlineExclamationCircle />
                            <h2 className="text-center text-[1.375rem] leading-[1.7875rem] font-semibold text-[#202738]">
                                Confirm Sell?
                            </h2>
                            <p className="w-full max-w-81.5 text-center text-sm leading-5.25 font-normal text-[#7C8593]">
                                You're about to sell this position before the round ends.
                            </p>
                        </div>
                    </DialogTitle>

                    <div className="mt-6 rounded-[0.75rem] border border-[#EAF0FF] bg-white p-4">
                        <div className="space-y-3.5">
                            <SummaryRow label="Market" value={market} />
                            <SummaryRow
                                label="Direction"
                                value={directionLabel}
                                valueClass={cn('rounded-xl px-[0.7085rem] py-[0.28125rem] text-white', directionColor)}
                            />
                            <SummaryRow label="Invested" value={formatCurrency(Number(bet.amount))} />
                            <SummaryRow label="Current Value" value={formatCurrency(Number(bet.currentValue))} />
                            <hr className="border-[#EAF0FF]" />
                            <SummaryRow
                                label="P&L"
                                value={formatCurrency(Number(bet.pnl))}
                                valueClass={
                                    Number(bet.pnl) > 0
                                        ? 'text-[#00D26A] font-semibold'
                                        : Number(bet.pnl) < 0
                                          ? 'text-[#FF4D4F] font-semibold'
                                          : 'text-gray-400 font-semibold'
                                }
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex w-full flex-col items-center justify-center gap-3">
                        <p className="text-center text-sm leading-5.25 font-normal text-[#7C8593]">You will receive:</p>
                        <h3 className="text-center text-2xl leading-9 font-semibold text-[#1E4CF0]">
                            {formatCurrency(Number(bet.currentValue))}
                        </h3>
                        <p className="text-center text-xs leading-4.5 font-normal text-[#7C8593]">
                            This amount will be added to your wallet immediately.
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                        <DialogClose className="click w-full cursor-pointer rounded-xl border border-[#CBD3E1] py-[0.71875rem] text-sm leading-5.25 font-medium text-[#7C8593]">
                            Cancel
                        </DialogClose>
                        <CustomButton
                            className="w-full rounded-xl py-[0.71875rem]"
                            onClick={handleSell}
                            disabled={isSelling}
                        >
                            {isSelling ? 'Selling...' : 'Confirm Sell'}
                        </CustomButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

function SummaryRow({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
    const titleClass = 'font_dmSans text-sm leading-5 font-medium text-[#7C8593]';
    const valueBaseClass = 'font_dmSans text-sm leading-5 font-medium text-[#202738]';
    return (
        <div className="flex justify-between">
            <p className={cn(titleClass)}>{label}</p>
            <p className={cn(valueBaseClass, valueClass)}>{value}</p>
        </div>
    );
}

export default ConfirmSellModal;
