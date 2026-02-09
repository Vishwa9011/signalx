"use client";

import { bitcoinStore } from "@/features/market/store/bitcoin-store";
import { useRoundStore } from "@/features/market/store/round-store";
import type { BackendPricePointType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/lib";

export const useHistoricBitcoinDataQuery = () => {
  const { startTime } = useRoundStore((state) => state.round);
  const refreshKey = bitcoinStore((state) => state.refreshKey);

  const hasValidStart = Boolean(startTime && startTime > 0);
  // const CUTOFF_TIME = hasValidStart ? new Date(startTime).getTime() : 0;

  return useQuery({
    queryKey: ["btc-history", refreshKey, startTime],
    enabled: hasValidStart,
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL ?? ""}/chart-history`,
        { cache: "no-store" },
      );
      if (!response.ok) {
        console.error("Error fetching historical data:", response.statusText);
        return [];
      }

      const result = await response.json();
      const data: BackendPricePointType[] = result.data || [];

      const normalizedData = data.map((d) => ({
        x: d.timestamp * 1000,
        y: d.price / 10000,
      }));

      return normalizedData;
    },
    staleTime: 30 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
