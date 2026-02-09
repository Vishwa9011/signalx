'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import DisconnectIcon from '@/constants/svgs/disconnect-icon';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import ProfileIcon from '@/constants/svgs/profile-icon';
import { truncateString } from '@/lib';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import TradeHistory from '@/features/trades/trade-history';
import Leaderboard from '@/features/leaderboard/leaderboard';
import { useEffect } from 'react';

const Profile = () => {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const router = useRouter();

    useEffect(() => {
        if (!isConnected) {
            router.push('/trade');
        }
    }, [isConnected, router]);

    return (
        <section className="min-h-dvh">
            <div className="mx-auto flex w-full max-w-300 flex-col gap-6 px-6 py-10">
                <div>
                    <Link
                        href="/trade"
                        className="click group/back flex w-fit items-center justify-center gap-2 text-sm leading-5.25 font-normal text-[#717182]"
                    >
                        <IoArrowBack className="text-base transition-transform duration-300 group-hover/back:-translate-x-1" />
                        Back
                    </Link>
                </div>

                <div className="shadow-shadow1 m:flex-row m:gap-4 flex flex-col items-center justify-between gap-8 rounded-2xl border border-[#E9EDF5] bg-white p-[1.56rem]">
                    <div className="flex items-center justify-center gap-3">
                        <ProfileIcon className="h-12 w-12" />
                        <div>
                            <p className="text-base leading-6 font-semibold text-[#030213]">
                                {truncateString(address || '')}
                            </p>
                            <span className="rounded-xl bg-[#E8F0FF] px-2 py-[0.12rem] text-[0.6875rem] leading-[0.91669rem] font-medium text-[#1E4CF0]">
                                Connected
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            open();
                        }}
                        className="click flex items-center justify-center gap-[0.62rem] rounded-[0.875rem] border border-[#F01E22] bg-white px-[0.81rem] py-[0.62rem] text-sm leading-5 font-medium text-[#F01E22]"
                    >
                        <DisconnectIcon />
                        Disconnect Wallet
                    </button>
                </div>

                <div>
                    <Tabs defaultValue="account">
                        <div className="flex items-center justify-center">
                            <TabsList className="shadow-shadow1 h-[3.3rem] gap-4 rounded-[1048575rem] border border-[#E9EDF5] bg-white px-2 will-change-transform">
                                <TabsTrigger
                                    value="account"
                                    className="cursor-pointer rounded-[1048575rem] px-8 py-2 text-sm leading-5 font-medium text-[#717182] transition-all duration-300 hover:scale-105 active:scale-90 data-[state=active]:bg-[#1E4CF0] data-[state=active]:text-white"
                                >
                                    Trade History
                                </TabsTrigger>
                                <TabsTrigger
                                    value="password"
                                    className="cursor-pointer rounded-[1048575rem] px-8 py-2 text-sm leading-5 font-medium text-[#717182] transition-all duration-300 hover:scale-105 active:scale-90 data-[state=active]:bg-[#1E4CF0]  data-[state=active]:text-white"
                                >
                                    Leaderboard
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="mt-8 w-full">
                            <TabsContent value="account">
                                <TradeHistory sectionClassName="p-0 min-h-auto" containerClassName="py-0 md:px-0" />
                            </TabsContent>
                            <TabsContent value="password">
                                <Leaderboard sectionClassName="p-0 min-h-auto" containerClassName="py-0 md:px-0" />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default Profile;
