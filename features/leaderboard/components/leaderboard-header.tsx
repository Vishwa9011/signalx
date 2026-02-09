'use client';

type LeaderboardHeaderProps = {
    title?: string;
    description?: string;
};

export const LeaderboardHeader = ({
    title = 'Top Traders',
    description = 'Ranked by total winnings and performance',
}: LeaderboardHeaderProps) => {
    return (
        <div>
            <h3 className="text-[1.125rem] leading-6.75 font-semibold text-[#030213]">{title}</h3>
            <p className="text-sm leading-5.25 font-normal text-[#717182]">{description}</p>
        </div>
    );
};
