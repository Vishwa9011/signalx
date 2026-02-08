"use client";

import { useEffect } from "react";
import { HermesClient } from "@pythnetwork/hermes-client";

const PRICE_ID =
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";

let initialized = false;

export const useInitializeBitcoinChartData = () => {
  useEffect(() => {
    if (initialized) return;

    let stream: EventSource;
    const init = async () => {
      const client = new HermesClient("https://hermes.pyth.network", {});
      stream = await client.getPriceUpdatesStream([PRICE_ID], {
        parsed: true,
        benchmarksOnly: true,
      });

      stream.onmessage = (message) => {
        console.log("Received price update:", message);
      };
    };
    init();

    initialized = true;

    return () => {
      if (stream) {
        stream.close();
        console.log("Stream closed");
      }
    };
  }, []);
};
