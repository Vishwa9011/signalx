'use client';

import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { useTradeHistory } from '@/features/trades/hooks/useTradeHistory';
import { EmptyState } from '@/features/trades/components/EmptyState';
import { calculatePaginationInfo } from '@/lib/filter-pagination.helpers';
import { TradeHistoryTable } from '@/features/trades/components/TradeHistoryTable';
import { TradeHistoryFilters } from '@/features/trades/components/TradeHistoryFilters';
import { TradeHistoryPagination } from '@/features/trades/components/TradeHistoryPagination';
import TradeNotFound from '@/features/trades/components/TradenotFound';

type TimeFilter = 'all_time' | 'this_month';

type TradeHistoryProps = {
    sectionClassName?: string;
    containerClassName?: string;
};

const TradeHistory = (props: TradeHistoryProps) => {
    const { address } = useAccount();
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('all_time');
    const { data, isPending, prevPage, nextPage, currentPage, setCurrentPage, userTradeCount } =
        useTradeHistory(timeFilter);

    const paginationInfo = calculatePaginationInfo(userTradeCount, currentPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [timeFilter, setCurrentPage]);

    return (
        <section className={cn('min-h-[80dvh] p-4', props.sectionClassName)}>
            <div className={cn('mx-auto flex w-full max-w-300 flex-col gap-6 py-10 md:px-6', props.containerClassName)}>
                <div className="shadow-shadow1 rounded-2xl border border-[#E9EDF5] bg-white p-6">
                    <TradeHistoryFilters timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />

                    {!address ? (
                        <EmptyState message="Please connect your wallet to view trade history" />
                    ) : isPending ? (
                        <EmptyState message="Loading trade history..." />
                    ) : (
                        <div className="mt-6 overflow-x-auto">
                            {!data || data.length === 0 ? (
                                <TradeNotFound />
                            ) : (
                                <>
                                    <TradeHistoryTable trades={data} />
                                    {paginationInfo && (
                                        <TradeHistoryPagination
                                            paginationInfo={paginationInfo}
                                            onPrevPage={prevPage}
                                            onNextPage={nextPage}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TradeHistory;
