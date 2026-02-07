'use client';

import { useState } from 'react';
import InfoIcon from '@/constants/svgs/InfoIcon';
import BitcoinIcon from '@/constants/svgs/BitcoinIcon';
import { HOW_IT_WORKS_DATA } from '@/constants/how-it-works';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/animate-ui/components/radix/popover';

const QuestionHeader = () => {
    return (
        <div className="flex items-center gap-3 rounded-[0.625rem] bg-white px-4 py-5">
            <BitcoinIcon className="size-14" />
            <div className="font_dmSans flex w-full flex-col gap-[0.625rem] text-[#0D0F1C]">
                <h2 className="text-[1.125rem] leading-[1.75rem] font-semibold md:text-[1.25rem]">
                    Predict BTC movement every minute.
                </h2>
                <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.875rem] leading-[1.40625rem] font-medium text-[#6B7280] sm:text-[0.9375rem]">
                        60s to Bet. 60s to Win.
                    </p>
                    <HowItWorks />
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;

type HowItWorksProps = {};

const HowItWorks = ({}: HowItWorksProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className="flex cursor-pointer items-center gap-1 text-[#1E4CF0]">
                <InfoIcon />
                <span className="font hidden text-[0.8125rem] leading-[1.21875rem] font-medium sm:block">
                    How it works
                </span>
            </PopoverTrigger>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 top-0 left-0 z-99999 h-screen w-screen bg-black/50"
                ></div>
            )}
            <PopoverContent className="z-999999 w-[22.375rem] border-none ">
                {HOW_IT_WORKS_DATA.map((item, index) => (
                    <HIWRow key={index} title={item.title} description={item.description} />
                ))}
                <hr className="my-3 border-[#EAF0FF]" />
                <p className="text-[0.8125rem] leading-[1.21875rem] font-medium text-[#1E4CF0]">
                    💡 Pro Tip: You are predicting the next candle (green/red)
                </p>
            </PopoverContent>
        </Popover>
    );
};

// HIW => how it works
type HIWRowProps = {
    title: string;
    description: string;
};

const HIWRow = ({ title, description }: HIWRowProps) => {
    return (
        <div className="grid grid-cols-[96px_1fr] gap-[0.125rem] py-[0.1875rem]">
            <div className="flex justify-between">
                <h3 className="text-[0.8125rem] leading-[1.3rem] font-bold">{title}</h3>
                <span className="text-[0.8125rem] leading-[1.3rem] font-bold">{':'}</span>
            </div>
            <p className="text-[0.75rem] leading-[1.3rem] font-normal text-[#202738]">{description}</p>
        </div>
    );
};
