'use client';

import React from 'react';
import { getPythPriceForTimestamp } from '@/features/market/api';

/**
 * Self-contained utility to fetch and display a Pyth price for a timestamp.
 * Does not mutate outer state.
 */
const FetchPrice = () => {
    const [timestamp, setTimestamp] = React.useState<number>(0);
    const [lastPrice, setLastPrice] = React.useState<number | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleFetchPrice = async () => {
        if (!timestamp) return;
        setIsLoading(true);
        const price = await getPythPriceForTimestamp(timestamp);
        setIsLoading(false);
        if (price === null) return;
        setLastPrice(price);
    };

    return (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-3">
                <input
                    type="number"
                    value={timestamp}
                    onChange={e => setTimestamp(Number(e.target.value))}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="Timestamp (seconds)"
                />
                <button
                    type="button"
                    onClick={handleFetchPrice}
                    disabled={isLoading}
                    className="min-w-[120px] cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    {isLoading ? 'Fetching…' : 'Fetch Price'}
                </button>
            </div>
            <div className="text-xs text-slate-700">
                {lastPrice !== null ? `Price: ${lastPrice}` : 'Enter a timestamp and fetch the price.'}
            </div>
        </div>
    );
};

export default FetchPrice;
