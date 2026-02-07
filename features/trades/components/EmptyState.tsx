'use client';

type EmptyStateProps = {
    message: string;
};

export const EmptyState = ({ message }: EmptyStateProps) => {
    return (
        <div className="flex h-60 w-full items-center justify-center">
            <div className="text-center">
                <span className="text-sm leading-5 font-medium text-[#717182]">{message}</span>
            </div>
        </div>
    );
};
