'use client';

import DataNotFoundIcon from '@/constants/svgs/DataNotFoundIcon';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

const TradeNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-[1.19rem] py-10">
            <div>
                <DataNotFoundIcon />
            </div>
            <p className="text-center text-xl leading-6.75 font-semibold text-[#202738]">No Trades Found</p>
            <p className="mx-auto w-full max-w-92 text-center text-sm leading-[1.4rem] font-normal text-[#7C8593]">
                You haven't made any trades yet. Start exploring markets and make your first prediction.
            </p>

            <Link
                href="/"
                className="click flex items-center justify-center gap-1 rounded-[0.625rem] bg-[#1E4CF0] px-3 py-2 text-sm leading-5 font-medium text-white"
            >
                Trade Now <IoArrowForward />
            </Link>
        </div>
    );
};

export default TradeNotFound;
