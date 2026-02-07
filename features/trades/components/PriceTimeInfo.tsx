'use client';

import { formatCurrency } from '@/lib';
import CountdownTimer from './CountdownTimer';
import { useRoundStore } from '@/features/market/store/roundStore';

const PriceTimeInfo = () => {
    const { round } = useRoundStore();
    const { startPrice } = round;

    return (
        <div className="l:p-5 flex items-center justify-between gap-3 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-tertiary  l:leading-[1.40625rem] text-[1.125rem] leading-normal font-semibold text-[#000000]">
                        {startPrice === 0 ? '— — —' : formatCurrency(startPrice)}
                    </h2>
                    <p className="font_dmSans text-[0.75rem] leading-normal font-medium text-[#00000099]">
                        BASELINE PRICE
                    </p>
                </div>
            </div>
            <CountdownTimer />
        </div>
    );
};

export default PriceTimeInfo;
