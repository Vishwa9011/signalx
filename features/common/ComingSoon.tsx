'use client';

import dynamic from 'next/dynamic';
import ComingSoonAnimation from '@/assets/coming-soon.json';
import Link from 'next/link';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const ComingSoon = () => {
    return (
        <div className="flex h-[calc(100vh-78px-48px)] flex-col items-center justify-center bg-white md:bg-transparent">
            <h1 className="hidden text-[5rem] font-bold text-[#1E4CF0] md:block">COMING SOON</h1>
            <div className="flex w-[32rem] flex-col items-center justify-center space-y-6 md:space-y-0">
                <Lottie animationData={ComingSoonAnimation} autoplay loop={true} />
                <h1 className="text-[2.5rem] font-bold text-[#1E4CF0] md:hidden">COMING SOON</h1>
                <Link
                    href="/"
                    className="flex w-[22.25rem] items-center justify-center rounded-[0.5rem] bg-[#1E4CF0] px-[1.5rem] py-[0.75rem] text-white "
                >
                    Back to Home →
                </Link>
            </div>
        </div>
    );
};

export default ComingSoon;
