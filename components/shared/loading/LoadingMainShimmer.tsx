'use client';

const LoadingMainShimmer = () => {
    return (
        <div className="l:flex-row flex h-full flex-col gap-6 px-4  py-7 sm:px-13">
            <div className="tablet:flex hidden flex-[0.8]"></div>
            {/* middle column */}
            <div className="l:flex-row flex flex-1 flex-col justify-between gap-3 ">
                <div className="w-full space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 rounded-[0.625rem] bg-white p-4 shadow-sm">
                        <div className="shimmer h-12 w-12 rounded-md" />
                        <div className="flex-1">
                            <div className="shimmer mb-2 h-5 w-3/4 rounded-md" />
                            <div className="shimmer h-4 w-1/3 rounded-md" />
                        </div>
                    </div>

                    {/* Info boxes */}
                    <div className="flex items-center justify-between gap-3 rounded-[0.625rem] bg-white p-4 shadow-sm">
                        <div>
                            <div className="shimmer mb-2 h-5 w-36 rounded-md" />
                            <div className="shimmer h-3 w-20 rounded-md" />
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="shimmer mb-2 h-5 w-36 rounded-md" />
                            <div className="shimmer h-3 w-20  rounded-md" />
                        </div>
                    </div>

                    {/* Chart placeholder */}
                    <div className=" rounded-[0.625rem] bg-white p-4 shadow-sm">
                        <div className="shimmer min-h-90 w-full rounded-md" />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 rounded-[0.625rem] bg-white p-4 shadow-sm">
                        <div className="shimmer h-11 w-full rounded-[0.75rem]" />
                        <div className="shimmer h-11 w-full rounded-[0.75rem]" />
                    </div>
                </div>

                <div className="l:min-w-16 l:flex hidden items-center  gap-2 rounded-[0.625rem] bg-white p-4 shadow-sm">
                    <div className="shimmer h-full w-3 rounded-md"></div>
                    <div className="flex h-full flex-col justify-between">
                        <div className="shimmer h-20 w-2.5 rounded-md"></div>
                        <div className="shimmer h-20 w-2.5 rounded-md"></div>
                    </div>
                </div>
            </div>

            {/* third column  */}
            <div className="l:flex hidden flex-[0.8] flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-3 rounded-[0.625rem] bg-white px-4 py-5 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <div className="shimmer h-6 w-36 rounded-md"></div>
                            <div className="shimmer h-4 w-20 rounded-md"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-[0.625rem] bg-white px-4 py-5 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <div className="shimmer h-6 w-36 rounded-md"></div>
                            <div className="shimmer h-4 w-20 rounded-md"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-3 rounded-[0.625rem] bg-white px-4 py-5 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <div className="shimmer h-6 w-36 rounded-md"></div>
                            <div className="shimmer h-4 w-20 rounded-md"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-[0.625rem] bg-white px-4 py-5 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <div className="shimmer h-6 w-36 rounded-md"></div>
                            <div className="shimmer h-4 w-20 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingMainShimmer;
