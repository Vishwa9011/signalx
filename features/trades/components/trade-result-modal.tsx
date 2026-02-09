'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import trophyAnimation from '@/assets/trophy.json';
import useTradeResult from '@/features/trades/hooks/use-trade-result';
import errorAnimation from '@/assets/error-monster-strikes-again-lottie-animation.json';
import { useTradeStore } from '@/features/market/store/trade-store';
import { formatCurrency, getDirectionText, getPnLSign } from '@/lib';

const MODAL_CONFIG = {
    WON: {
        animation: trophyAnimation,
        title: 'You Won This Round 🎉',
        description: 'Great job! Your prediction was correct.',
        primaryButtonText: 'Continue →',
        primaryButtonStyles: 'bg-blue-500 hover:bg-blue-600',
    },
    LOSE: {
        animation: errorAnimation,
        title: 'Better Luck Next Time 💔',
        description: "Your prediction didn't go as expected.",
        primaryButtonText: 'Try Again →',
        primaryButtonStyles: 'bg-[#FF4D4F] hover:bg-[#d32f2f]',
    },
    DRAW: {
        animation: errorAnimation,
        title: 'Round Drawn 🤝',
        description: 'The round ended in a draw. Your bet has been refunded.',
        primaryButtonText: 'Continue →',
        primaryButtonStyles: 'bg-blue-500 hover:bg-blue-600',
    },
};

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const TradeResultModal = () => {
    const router = useRouter();
    const { clearData } = useTradeStore();
    const { data } = useTradeResult();
    const { isWon, resultText, amount, isRefunded, result, payout, wonAmount, wonPercentage } = data;
    const config = MODAL_CONFIG[resultText];
    const directionColor = isRefunded ? 'text-[#202738]' : isWon ? 'text-[#00D26A]' : 'text-[#FF4D4F]';
    const payoutColor = isRefunded ? 'text-[#202738]' : isWon ? 'text-[#00D26A]' : 'text-[#FF4D4F]';
    const payoutPercentDisplay = Number.isFinite(wonPercentage) ? wonPercentage.toFixed(2) : '0.00';

    const handleViewHistory = () => {
        clearData();
        router.push('/history');
    };

    function onClose() {
        clearData();
    }

    if (isWon === null && !isRefunded) return null;

    return (
        <div
            className="font-tertiary fixed inset-0 z-999 flex items-center justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.40)' }}
            onClick={onClose}
        >
            <div
                className="mx-4 flex w-full max-w-105 flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="mx-auto h-16 w-16">
                    <Lottie animationData={config.animation} autoplay loop={true} />
                </div>

                <div className="">
                    <h2 className="font-tertiary text-center text-[1.375rem] font-semibold text-[#202738]">
                        {config.title}
                    </h2>
                    <p className="text-center text-sm text-[#7C8593]">{config.description}</p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-[#EAF0FF] bg-white p-[1.31rem]">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-normal text-[#7C8593]">Market</p>
                        <p className="text-sm font-medium text-[#202738]">{'BTC/USD'}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-normal text-[#7C8593]">Win Direction</p>
                        <p className={`text-sm font-medium ${directionColor}`}>{getDirectionText(result)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-normal text-[#7C8593]">Entry Amount</p>
                        <p className="text-sm font-medium text-[#202738]">{formatCurrency(amount)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-normal text-[#7C8593]">Win Amount</p>
                        <p className={`text-sm font-semibold ${payoutColor}`}>
                            {getPnLSign(wonAmount)}
                            {formatCurrency(wonAmount)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-normal text-[#7C8593]">Win Percentage</p>
                        <p className={`text-sm font-semibold ${payoutColor}`}>
                            {getPnLSign(Number(payoutPercentDisplay))}
                            {payoutPercentDisplay}%
                        </p>
                    </div>
                    <hr className="border-[#EAEAEA]" />
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-normal text-[#7C8593]">Payout</p>
                        <p className={`text-[1rem] leading-[1.5rem] font-semibold ${payoutColor}`}>
                            {isWon !== null ? getPnLSign(payout) : ''}
                            {formatCurrency(payout)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onClose}
                        className={`mb-3 w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-normal text-white transition-colors ${config.primaryButtonStyles}`}
                    >
                        {config.primaryButtonText}
                    </button>

                    <button
                        onClick={handleViewHistory}
                        className="w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-normal text-[#7C8593] transition-colors"
                    >
                        View History →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradeResultModal;
