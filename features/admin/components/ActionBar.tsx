'use client';

import SectionCard from './SectionCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRoundDetails, operateRound } from '@/features/market/api';
import { useRoundStore } from '@/features/market/store/roundStore';

export default function ActionBar() {
    const { triggerRoundRefetch } = useRoundStore();
    const operateRoundMutation = useMutation({ mutationFn: operateRound });
    const { data: roundDetails, refetch } = useQuery({ queryKey: ['admin-round-details'], queryFn: getRoundDetails });

    const handleToggle = async () => {
        await operateRoundMutation.mutateAsync();
        triggerRoundRefetch();
        await refetch();
    };

    const isRunning = !!roundDetails?.isRunning;
    const isToggling = operateRoundMutation.isPending;
    const errorMessage = operateRoundMutation.error ? 'Failed to toggle round state. Please try again.' : null;

    return (
        <SectionCard>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Admin Controls</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleToggle}
                        disabled={isToggling || isRunning}
                        className={`rounded-lg px-6 py-2 font-semibold text-white shadow transition 
                        ${isRunning ? 'cursor-not-allowed bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        Start
                    </button>
                    <button
                        onClick={handleToggle}
                        disabled={isToggling || !isRunning}
                        className={`rounded-lg px-6 py-2 font-semibold text-white shadow transition 
                        ${!isRunning ? 'cursor-not-allowed bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                        Stop
                    </button>
                </div>
            </div>
            <p className="mt-1 text-sm text-slate-600">
                {isRunning ? '🟢 Next round will start automatically.' : '🔴 Next round will not start automatically.'}
            </p>
            {errorMessage && (
                <div className="mt-3 rounded-lg border border-red-500 bg-red-500/10 p-2">
                    <p className="text-center font-medium text-red-600">{errorMessage}</p>
                </div>
            )}
        </SectionCard>
    );
}
