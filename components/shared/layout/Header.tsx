'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import CloseIcon from '@/constants/svgs/CloseIcon';
import NavIcon from '@/constants/svgs/NavIcon';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { cn, formatCurrency } from '@/lib';
import WalletIcon from '@/constants/svgs/WalletIcon';
import useBalance from '@/features/web3/hooks/useBalance';

const Header = () => {
    const { open } = useAppKit();
    const pathname = usePathname();
    const { balance } = useBalance();
    const { isConnected, address } = useAppKitAccount();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navOptions = [
        {
            name: 'Trade',
            link: '/trade',
            isActive: pathname === '/trade',
        },
        {
            name: 'History',
            link: '/history',
            isActive: pathname === '/history',
        },
        {
            name: 'Rankings',
            link: '/rankings',
            isActive: pathname === '/rankings',
        },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="l:bg-white l:px-13 relative z-99999 flex h-19.5 items-center justify-between bg-[#E9F0FF] px-4">
            <div className="flex flex-1 items-center justify-start">
                <div>
                        <Link href="/" onClick={handleLinkClick}>
                            <div className="l:w-37.75 l:h-17.5 h-9 w-23.5">
                                <img src="/assets/logo.png" alt="signalx logo" className="h-full w-full object-cover object-center" />
                            </div>
                        </Link>
                </div>
            </div>

            <div className="l:flex hidden flex-1 items-center justify-center">
                <div className="flex items-center  gap-4">
                    {navOptions.map(option => (
                        <div
                            key={option.name}
                            className={cn(
                                `relative inline-block transition-all duration-300 hover:scale-105 active:scale-95`,
                            )}
                        >
                            <Link
                                href={option.link}
                                className={`font_dmSans mx-2 text-base leading-6 font-normal text-nowrap ${
                                    option.isActive ? 'text-[#0D0F1C]' : 'text-black'
                                }`}
                                onClick={handleLinkClick}
                            >
                                {option.name}
                            </Link>
                            {option.isActive && <div className="h-0.5 rounded-[1.25rem] bg-[#1549B3]"></div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="l:flex hidden flex-1 items-center justify-end gap-2">
                {isConnected ? (
                    <>
                        <button className="h-10 rounded-[0.875rem] bg-[#F0F4FF] px-[0.81rem] text-sm leading-[1.00625rem] font-medium font-semibold tracking-[0.02188rem] text-[#1E4CF0]">
                            Balance: {formatCurrency(balance)}
                        </button>
                        <Link
                            onClick={handleLinkClick}
                            href="/account"
                            className="click flex h-10 items-center justify-center gap-4 rounded-[0.875rem] border border-[#E9EDF5] px-[0.81rem] hover:border-[#568FFF] hover:bg-[#E9F3FF]"
                        >
                            <WalletIcon />{' '}
                            <span className="w-19.5 truncate text-sm leading-5 font-medium text-[#030213]">
                                {address}
                            </span>
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            open();
                        }}
                        className="font_dmSans click flex cursor-pointer items-center justify-center rounded-[1.25rem] bg-[#1549B3] px-6 py-4 text-sm leading-[1.00625rem] font-medium tracking-[0.02188rem] text-white"
                    >
                        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </button>
                )}
            </div>

            <div className="l:hidden flex flex-1 items-center justify-end">
                <button className="h-10 rounded-[0.875rem] bg-[#F0F4FF] px-[0.81rem] text-sm leading-[1.00625rem] font-medium font-semibold tracking-[0.02188rem] text-[#1E4CF0]">
                    Balance: {formatCurrency(balance)}
                </button>
                <div
                    className="relative h-6 w-6 cursor-pointer border-none transition-all duration-300 outline-none hover:scale-105 active:scale-95"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="relative h-[1.2rem] w-[1.2rem] cursor-pointer text-black transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <CloseIcon />
                        </button>
                    ) : (
                        <NavIcon />
                    )}
                </div>
            </div>

            {/* mobile sidebar */}
            <div
                className={`fixed top-0 left-0 z-20 h-full w-[70%] max-w-[16rem] transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Inside Mobile Menu */}
                <div className="flex flex-col space-y-6 p-6">
                    {/* Logo inside menu */}

                    <div className="mb-4 flex items-center justify-between">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="inline-flex h-9 w-23.5 cursor-pointer"
                        >
                            <img src="/assets/logo.png" alt="signalx logo" className="h-full w-full object-cover" />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="relative h-[1.2rem] w-[1.2rem] cursor-pointer text-black transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col space-y-4">
                        {navOptions.map(option => (
                            <Link
                                key={option.name}
                                href={option.link}
                                onClick={handleLinkClick}
                                className={`font_dmSans text-lg transition-all duration-300 ${
                                    option.isActive ? 'text-[#1549B3]' : 'text-[#0D0F1C]'
                                } hover:text-[#1549B3]`}
                            >
                                {option.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Connect Wallet Button */}
                    {isConnected ? (
                        <>
                            <Link
                                href="/account"
                                onClick={handleLinkClick}
                                className="click flex h-10 items-center justify-center gap-4 rounded-[0.875rem] border border-[#E9EDF5] px-[0.81rem] hover:border-[#568FFF] hover:bg-[#E9F3FF]"
                            >
                                <WalletIcon />{' '}
                                <span className="w-19.5 truncate text-sm leading-5 font-medium text-[#030213]">
                                    {address}
                                </span>
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                open();
                            }}
                            className="font_dmSans flex cursor-pointer items-center justify-center rounded-[1.25rem] bg-[#1549B3] px-6 py-4 text-sm leading-[1.00625rem] font-medium tracking-[0.02188rem] text-white"
                        >
                            {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                        </button>
                    )}
                </div>
            </div>

            {/* Overlay behind mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0  z-10 bg-black/30 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;
