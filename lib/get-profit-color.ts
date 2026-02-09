export const getProfitColor = (pnl: number) => {
    if (pnl > 0) return 'text-[#17A179]'; // Green for profit
    if (pnl < 0) return 'text-[#D12727]'; // Red for loss
    return 'text-[#00000099]'; // Gray for break-even
};
