"use client";

import { bitcoinStore } from "@/features/market/store/bitcoin-store";
import { useHistoricBitcoinDataQuery } from "./use-historic-bitcoin-data-query";
import { useEffect } from "react";

export const useBitcoinData = () => {
  const refreshKey = bitcoinStore((state) => state.refreshKey);
  const {
    data,
    isLoading: queryLoading,
    refetch,
  } = useHistoricBitcoinDataQuery();
  const setHasInitialized = bitcoinStore((state) => state.setHasInitialized);
  const setIsLoading = bitcoinStore((state) => state.setIsLoading);
  const replacePointsAtomically = bitcoinStore(
    (state) => state.replacePointsAtomically,
  );
  const applyBufferedPoints = bitcoinStore(
    (state) => state.applyBufferedPoints,
  );

  // load initial historical data
  useEffect(() => {
    if (data && data.length) {
      replacePointsAtomically(data);
      setHasInitialized(true);
    }
  }, [data, replacePointsAtomically, setHasInitialized]);

  // when refreshKey changes (e.g. new round), do a controlled transition
  useEffect(() => {
    let cancelled = false;
    const doTransition = async () => {
      try {
        setIsLoading(true);
        // refetch to ensure latest
        const res = await refetch();
        if (cancelled) return;
        if (res.data && res.data.length) {
          // atomically replace stored points
          replacePointsAtomically(res.data);

          // apply any buffered live updates after we replaced points
          applyBufferedPoints(60); // Use default 60 minute window
        }
      } catch (err) {
        console.error("Error during transition:", err);
        setIsLoading(false);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setHasInitialized(true);
        }
      }
    };

    // only run if refreshKey > 0
    if (refreshKey > 0) doTransition();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return { queryLoading };
};
