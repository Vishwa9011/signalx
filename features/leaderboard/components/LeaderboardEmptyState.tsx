'use client';

type LeaderboardEmptyStateProps = {
    isLoading?: boolean;
    message?: string;
};

export const LeaderboardEmptyState = ({ isLoading, message }: LeaderboardEmptyStateProps) => {
    const displayMessage = isLoading ? 'Loading leaderboard...' : message || 'No leaderboard data available';

    return (
        <div className="flex h-60 w-full items-center justify-center">
            <span className="text-sm leading-5 font-medium text-[#717182]">{displayMessage}</span>
        </div>
    );
};
