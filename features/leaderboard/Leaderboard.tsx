'use client';

import { cn } from '@/lib';
import { useLeaderboard } from '@/features/leaderboard/hooks/useLeaderboard';
import { LeaderboardHeader, LeaderboardTable, LeaderboardEmptyState } from '@/features/leaderboard/components';

type LeaderboardType = {
    sectionClassName?: string;
    containerClassName?: string;
};

const Leaderboard = ({ sectionClassName, containerClassName }: LeaderboardType) => {
    const { data, isPending } = useLeaderboard();

    const hasData = !isPending && data.length > 0;
    const isEmpty = !isPending && data.length === 0;

    return (
        <section className={cn('min-h-[80dvh] p-4', sectionClassName)}>
            <div className={cn('mx-auto flex w-full max-w-300 flex-col gap-6 py-10 md:px-6', containerClassName)}>
                <div className="shadow-shadow1 rounded-2xl border border-[#E9EDF5] bg-white p-6">
                    <LeaderboardHeader />

                    <div className="mt-6 overflow-x-auto">
                        {isPending && <LeaderboardEmptyState isLoading />}
                        {isEmpty && <LeaderboardEmptyState />}
                        {hasData && <LeaderboardTable data={data} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
