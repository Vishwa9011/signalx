'use client';

import { useRoundStore } from '@/features/market/store/roundStore';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { cn, formatCurrency } from '@/lib';
import UserInvestment from './UserInvestment';

//  (roundPools.upPool / roundPools.totalPool) * 100 probablity
const PoolInfo = () => {
    const { roundBets, roundPools } = useRoundStore();

    const pools = [
        {
            type: 'up' as const,
            poolAmount: roundPools.upPool,
            poolProbability: Number((roundPools.upMultiplier * 100).toFixed(2)),
            totalUsers: roundBets.upBets.length,
        },
        {
            type: 'down' as const,
            poolAmount: roundPools.downPool,
            poolProbability: Number((roundPools.downMultiplier * 100).toFixed(2)),
            totalUsers: roundBets.downBets.length,
        },
    ];

    return (
        <div className="l:w-[24.5625rem] flex w-full flex-col justify-between">
            {/* Desktop Layout */}
            <div className="hidden flex-col gap-3 sm:flex">
                {pools.map(pool => (
                    <PoolInfoDesktop key={pool.type} {...pool} />
                ))}
            </div>

            {/* Mobile Layout */}
            <div className="grid grid-cols-2 gap-3 p-4 sm:hidden">
                {pools.map(pool => (
                    <PoolInfoMobile key={pool.type} {...pool} />
                ))}
            </div>

            <UserInvestment />
        </div>
    );
};

export default PoolInfo;

type PoolProps = {
    type: 'up' | 'down';
    poolAmount: number;
    poolProbability: number;
    totalUsers: number;
};

// -------- Shared Formatting Helpers --------

const usePoolMeta = (type: PoolProps['type']) => ({
    isUp: type === 'up',
    label: type === 'up' ? 'Up' : 'Down',
    arrow: type === 'up' ? FaArrowUp : FaArrowDown,
    color: type === 'up' ? '#00D26A' : '#FF4D4F',
    bg: type === 'up' ? 'bg-[#E6F7F0]' : 'bg-[#FFE8E8]',
});

const PoolInfoMobile = ({ type, poolProbability, poolAmount, totalUsers }: PoolProps) => {
    const { label, color } = usePoolMeta(type);

    return (
        <div className="flex items-center justify-between rounded-[0.625rem] bg-white md:hidden">
            <div>
                <h2 className="text-[0.875rem] font-bold">
                    {label} Payout:{' '}
                    <span className="font-bold" style={{ color }}>
                        {poolProbability}%
                    </span>
                </h2>
                <p className="text-[0.75rem]">Total Pool Amount: {formatCurrency(poolAmount)}</p>
                <p className="text-[0.75rem]">Number of Bets: {totalUsers}</p>
            </div>
        </div>
    );
};

const PoolInfoDesktop = ({ type, poolProbability, poolAmount, totalUsers }: PoolProps) => {
    const { arrow: Arrow, label, color, bg } = usePoolMeta(type);

    return (
        <div className="l:p-6 flex flex-col gap-3 rounded-[0.625rem] bg-white p-4">
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                    <h2 className="font_dmSans text-[1.125rem] font-bold -tracking-[0.025rem] text-[#0D0F1C]">
                        {label} Payout:
                    </h2>
                    <p className="font-tertiary text-[1.125rem] font-semibold" style={{ color }}>
                        +{poolProbability.toFixed(2)}%
                    </p>
                </div>

                <hr className="border-[#EAEAEA]" />

                <div className="grid grid-cols-2 items-center justify-between">
                    {/* Pool Amount */}
                    <div>
                        <p className="text_dmSans mt-[0.31rem] text-xs text-[#8794A1]">Total Pool Amount</p>
                        <p className="font_dmSans font-tertiary text-[1.25rem] font-semibold text-[#202738]">
                            {formatCurrency(poolAmount)}
                        </p>
                    </div>

                    {/* Total Users */}
                    <div className="flex items-center gap-2">
                        <div className={cn('flex h-6 w-6 items-center justify-center rounded-full', bg)}>
                            <Arrow className="text-[0.875rem]" style={{ color }} />
                        </div>
                        <div>
                            <p className="text_dmSans mt-[0.31rem] text-xs text-[#8794A1]">Total Users</p>
                            <p className="font_dmSans font-tertiary text-[1.25rem] font-semibold text-[#202738]">
                                {totalUsers}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
