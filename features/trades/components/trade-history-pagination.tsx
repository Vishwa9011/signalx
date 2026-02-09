'use client';

import { cn } from '@/lib';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type PaginationInfo = {
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

type TradeHistoryPaginationProps = {
    paginationInfo: PaginationInfo;
    onPrevPage: () => void;
    onNextPage: () => void;
};

export const TradeHistoryPagination = ({ paginationInfo, onPrevPage, onNextPage }: TradeHistoryPaginationProps) => {
    return (
        <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-[#717182]">
                Showing page {paginationInfo.currentPage} of {paginationInfo.totalPages} ({paginationInfo.totalRecords}{' '}
                total trades)
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrevPage}
                    disabled={!paginationInfo.hasPreviousPage}
                    className={cn(
                        'flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                        paginationInfo.hasPreviousPage
                            ? 'cursor-pointer border-[#E9EDF5] bg-white text-[#030213] hover:bg-[#F9FBFF]'
                            : 'cursor-not-allowed border-[#F1F5F9] bg-[#F8FAFC] text-[#CBD5E1]',
                    )}
                >
                    <IoChevronBack className="h-4 w-4" />
                    Previous
                </button>
                <button
                    onClick={onNextPage}
                    disabled={!paginationInfo.hasNextPage}
                    className={cn(
                        'flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                        paginationInfo.hasNextPage
                            ? 'cursor-pointer border-[#E9EDF5] bg-white text-[#030213] hover:bg-[#F9FBFF]'
                            : 'cursor-not-allowed border-[#F1F5F9] bg-[#F8FAFC] text-[#CBD5E1]',
                    )}
                >
                    Next
                    <IoChevronForward className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
