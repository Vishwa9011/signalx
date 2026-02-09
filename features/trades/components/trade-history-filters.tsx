'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TimeFilter = 'all_time' | 'this_month';

type TradeHistoryFiltersProps = {
    timeFilter: TimeFilter;
    onTimeFilterChange: (value: TimeFilter) => void;
};

export const TradeHistoryFilters = ({ timeFilter, onTimeFilterChange }: TradeHistoryFiltersProps) => {
    return (
        <div className="m:flex-row flex flex-col items-center justify-between gap-4">
            <div>
                <Select value={timeFilter} onValueChange={onTimeFilterChange}>
                    <SelectTrigger className="w-44 rounded-[0.875rem] border border-[#E9EDF5] bg-[#F3F3F5]">
                        <SelectValue placeholder="Filter Trade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all_time">All Time</SelectItem>
                            <SelectItem value="this_month">This Month</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
