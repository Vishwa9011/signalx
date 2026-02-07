'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import BetPercentageIndicator from '@/features/trades/components/BetPercentageIndicator';
import PoolInfo from '@/features/trades/components/PoolInfo';
const BitcoinChart = dynamic(() => import('@/features/trades/components/BitcoinChart'), { ssr: false });
import PriceTimeInfo from '@/features/trades/components/PriceTimeInfo';
import TradeResultModal from '@/features/trades/components/TradeResultModal';
import BettingInput from '@/features/trades/components/BettingInput';
import RoundMessageUpdates from '@/features/trades/components/RoundMessageUpdates';
import QuestionHeader from '@/features/trades/components/QuestionHeader';

import { handleFetchRoundDetails } from '@/features/market/api';
import { useRound } from '@/features/market/hooks/useRound';
import { useSocket } from '@/features/market/hooks/useSocket';
import useRoundPools from '@/features/market/hooks/useRoundPools';

// ----------------- Shared UI Blocks -----------------

const HeaderBlock = () => (
    <>
        <QuestionHeader />
        <PriceTimeInfo />
    </>
);

const GraphBlock = () => (
    <div className="relative h-[20.25rem] overflow-hidden rounded-[0.625rem] bg-white px-4 py-5 md:min-h-90">
        <RoundMessageUpdates />
        <BitcoinChart />
    </div>
);

// ----------------- Desktop -----------------

const DesktopVersion = () => {
    return (
        <div className="l:flex hidden h-full justify-center gap-3 px-1 py-7 sm:px-13">
            <div className="l:max-w-[31.125rem] flex w-full flex-col justify-between gap-3 2xl:justify-start">
                <HeaderBlock />

                <GraphBlock />

                <BettingInput />
            </div>

            <BetPercentageIndicator />

            <PoolInfo />
        </div>
    );
};

// ----------------- Mobile -----------------

const MobileVersion = () => {
    return (
        <div className="l:hidden flex h-full flex-col gap-4 px-1 py-7 sm:px-13">
            <HeaderBlock />
            <GraphBlock />

            <BetPercentageIndicator />
            <PoolInfo />
            <BettingInput />
        </div>
    );
};

// ----------------- Main Wrapper -----------------

const Trades = () => {
    useSocket();
    useRoundPools();
    useRound();

    useEffect(() => {
        handleFetchRoundDetails();
    }, []);

    return (
        <div>
            <TradeResultModal />
            <section className="l:bg-[#E9F0FF] h-full w-full bg-white">
                <DesktopVersion />
                <MobileVersion />
            </section>
        </div>
    );
};

export default Trades;
