'use client';

import { toast } from 'sonner';
import { useCallback, useMemo } from 'react';
import { useRoundStore } from '@/features/market/store/round-store';
import useNetworkConfig from '@/features/web3/hooks/use-network-data';
import useRoundControls from '@/features/admin/hooks/use-round-controls';
import { getPythLatestPrice, getPythPriceForTimestamp } from '@/features/market/api';

type Variant = 'green' | 'orange';

const styles: Record<Variant, string> = {
    green: 'bg-green-600 hover:bg-green-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
};

const RoundControl = () => {
    const { createRound, startRound, endRound, isPending } = useRoundControls();
    const { decimals } = useNetworkConfig();
    const { round } = useRoundStore();

    const handleStart = useCallback(async () => {
        const latestPrice = await getPythLatestPrice();
        if (!latestPrice) return toast.error('Failed to fetch latest price from Pyth Network.');
        await startRound(round.round, latestPrice.price, latestPrice.timestamp);
    }, [decimals, startRound, round.round]);

    const handleEnd = useCallback(async () => {
        const price = await getPythPriceForTimestamp(round.endTime / 1000);
        if (!price) return toast.error('Failed to fetch end price from Pyth Network.');
        await endRound(round.round, price);
    }, [round?.round, endRound]);

    const buttons = useMemo(
        () => [
            {
                label: '🆕 Create New Round',
                onClick: createRound,
                disabled: isPending,
                variant: 'green' as Variant,
            },
            {
                label: '🚀 Start Round',
                onClick: handleStart,
                disabled: isPending,
                variant: 'green' as Variant,
            },
            {
                label: '🏁 End Round',
                onClick: handleEnd,
                disabled: isPending,
                variant: 'orange' as Variant,
            },
        ],
        [handleStart, handleEnd, isPending, round?.created, round?.result],
    );

    return (
        <div className="mt-2 flex flex-row flex-wrap gap-3">
            {buttons.map(({ label, onClick, disabled, variant }) => (
                <Button key={label} onClick={onClick} disabled={disabled} variant={variant}>
                    {label}
                </Button>
            ))}
        </div>
    );
};

export default RoundControl;

const Button = ({
    onClick,
    disabled,
    variant,
    children,
}: {
    onClick: () => void;
    disabled: boolean;
    variant: Variant;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`rounded px-4 py-1.5 text-sm font-medium text-white transition 
        ${styles[variant]} disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500`}
        style={{ minWidth: 120 }}
    >
        {children}
    </button>
);
