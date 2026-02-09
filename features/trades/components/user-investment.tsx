'use client';

import { cn, formatCurrency, getPnLSign } from '@/lib';
import { getProfitColor } from '@/lib/get-profit-color';
import useUserActiveBets from '@/features/trades/hooks/use-user-active-bets';

const UserInvestment = () => {
    const { summary } = useUserActiveBets();

    return (
        <div className="grid grid-cols-2 gap-3 rounded-[0.625rem] bg-white px-4 py-5">
            <div className="flex flex-col gap-2">
                <h2 className="font_dmSans text-[0.875rem] leading-[1.40625rem] font-bold -tracking-[0.025rem] text-[#0D0F1C] md:text-[1.125rem]">
                    Your Investment
                </h2>
                <p className="font_dmSans text-[0.875rem] leading-normal font-bold text-[#00000099] md:font-medium">
                    {formatCurrency(summary.totalBetAmount)}
                </p>
            </div>

            <div className="flex flex-col items-stretch gap-2 sm:items-end">
                <h2 className="font_dmSans text-[0.875rem] leading-[1.40625rem] font-bold -tracking-[0.025rem] text-[#0D0F1C] md:text-[1.125rem]">
                    To win
                </h2>
                <p
                    className={cn(
                        `font_dmSans text-[0.875rem] leading-normal font-bold md:font-medium`,
                        getProfitColor(summary.totalPotentialPayout || 0),
                        {
                            'text-[#D12727]': summary.totalPotentialPayout === 0,
                        },
                    )}
                >
                    {summary.totalPotentialPayout === null || summary.totalPotentialPayoutPercentage === null
                        ? '— — —'
                        : getPnLSign(summary.totalPotentialPayout) +
                          formatCurrency(summary.totalPotentialPayout) +
                          ` (${summary.totalPotentialPayoutPercentage.toFixed(2)}%)`}
                </p>
            </div>
        </div>
    );
};

export default UserInvestment;
