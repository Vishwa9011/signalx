'use client';

import LoadingMainShimmer from './loading-main-shimmer';

const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 z-999 flex w-full items-center justify-center bg-[#F0F5FF] transition-opacity duration-500">
            <div className="w-full overflow-auto">
                <LoadingMainShimmer />
            </div>
        </div>
    );
};

export default GlobalLoader;
