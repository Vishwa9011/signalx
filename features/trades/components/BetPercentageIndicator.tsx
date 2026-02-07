'use client';

// import { calcBetPercentage, cn } from '@/lib';
import { cn } from '@/lib';
import { useRoundStore } from '@/features/market/store/roundStore';

type BetPercentageIndicatorProps = {};

const BetPercentageIndicator = ({}: BetPercentageIndicatorProps) => {
    const { roundPools } = useRoundStore();
    const upPercent =
        roundPools.totalPool > 0 ? Number(((roundPools.upPool / roundPools.totalPool) * 100).toFixed(2)) : 0;
    const downPercent =
        roundPools.totalPool > 0 ? Number(((roundPools.downPool / roundPools.totalPool) * 100).toFixed(2)) : 0;
    // const { upPercent, downPercent } = calcBetPercentage(roundBets.upBets?.length, roundBets.downBets?.length);
    return (
        <div className="l:min-w-16  l:flex-row flex flex-col-reverse gap-2 rounded-[0.625rem] bg-white p-3">
            {/* bars  */}
            <div
                className={cn(
                    'l:flex-col l:w-[1.1rem] l:h-full flex h-2 w-full flex-row-reverse overflow-hidden rounded-[0.625rem]',
                    !downPercent || !upPercent ? 'border' : '',
                )}
            >
                <div
                    className="l:rounded-b-none  l:rounded-t-[0.625rem] rounded-r-[0.625rem] bg-[#FF5555]"
                    style={{
                        width: `${downPercent}%`,
                        height: '100%',
                        ...(typeof window !== 'undefined' &&
                            window.innerWidth >= 1024 && {
                                width: '100%',
                                height: `${downPercent}%`,
                            }),
                    }}
                ></div>
                <div
                    className="l:rounded-b-[0.625rem] l:rounded-t-none rounded-l-[0.625rem] bg-[#13C591]"
                    style={{
                        width: `${upPercent}%`,
                        height: '100%',
                        ...(typeof window !== 'undefined' &&
                            window.innerWidth >= 1024 && {
                                width: '100%',
                                height: `${upPercent}%`,
                            }),
                    }}
                ></div>
            </div>

            {/* labels  */}
            <div className="l:flex-col flex w-full flex-row-reverse justify-between">
                <div className="relative">
                    <p className="font_dmSans l:-translate-x-1/2 l:left-2 l:top-[2.6rem] l:-translate-y-1/2 l:-rotate-90 l:absolute w-auto text-sm leading-[1.225rem] font-normal whitespace-nowrap text-[#1E1E1E]">
                        {downPercent}% down
                    </p>
                </div>
                <div className="relative">
                    <p className="font_dmSans l:-translate-x-1/2 l:left-2 l:-top-8 l:-translate-y-1/2 l:-rotate-90 l:absolute w-auto text-sm leading-[1.225rem] font-normal whitespace-nowrap text-[#1E1E1E]">
                        {upPercent}% up
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BetPercentageIndicator;
