// ============================================================================
// PAGINATION
// ============================================================================

export const LIMIT_PER_PAGE = 10;

type PaginationInfo = {
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

/**
 * Calculates pagination metadata based on total records and current page
 * @param userTradeCount - Total number of records
 * @param currentPage - Current page number (1-indexed)
 * @returns Pagination info or null if no records
 */
export const calculatePaginationInfo = (userTradeCount: number, currentPage: number): PaginationInfo | null => {
    if (userTradeCount === 0) return null;

    const totalPages = Math.ceil(userTradeCount / LIMIT_PER_PAGE);

    return {
        totalPages,
        totalRecords: userTradeCount,
        currentPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
};

// ============================================================================
// TIME FILTERING
// ============================================================================

export type TimeFilter = 'all_time' | 'this_month';

/**
 * Gets the timestamp threshold for filtering trades based on time filter
 * @param filter - The time filter to apply
 * @returns Timestamp in milliseconds (0 for all_time means no filter)
 */
export const getTimeFilterThreshold = (filter: TimeFilter): number => {
    if (filter === 'all_time') return 0;

    // Get start of current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return startOfMonth.getTime();
};

/**
 * Filters trade history data based on time filter
 * @param trades - Array of trades with timestamp property
 * @param filter - The time filter to apply
 * @returns Filtered array of trades
 */
export const filterTradesByTime = <T extends { timestamp: number }>(
    trades: T[] | null,
    filter: TimeFilter,
): T[] | null => {
    if (!trades) return null;

    const threshold = getTimeFilterThreshold(filter);

    // If all_time, return all data
    if (threshold === 0) return trades;

    // Filter trades that occurred after the threshold
    return trades.filter(trade => trade.timestamp >= threshold);
};
