"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import BetPercentageIndicator from "@/features/trades/components/bet-percentage-indicator";
import PoolInfo from "@/features/trades/components/pool-info";
const BitcoinChart = dynamic(
  () => import("@/features/trades/components/bitcoin-chart"),
  { ssr: false },
);
import PriceTimeInfo from "@/features/trades/components/price-time-info";
import TradeResultModal from "@/features/trades/components/trade-result-modal";
import BettingInput from "@/features/trades/components/betting-input";
import RoundMessageUpdates from "@/features/trades/components/round-message-updates";
import QuestionHeader from "@/features/trades/components/question-header";

import { handleFetchRoundDetails } from "@/features/market/api";
import { useRound } from "@/features/market/hooks/use-round";
import { useSocket } from "@/features/market/hooks/use-socket";
import useRoundPools from "@/features/market/hooks/use-round-pools";
import { useInitializeBitcoinChartData } from "../market/hooks/use-initialize-bitcoin-chart-data";

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
  useInitializeBitcoinChartData();

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
