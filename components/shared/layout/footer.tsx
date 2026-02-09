'use client';

import { socialLinks } from '@/constants/social-link';
import Twitter from '@/constants/svgs/twitter';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="l:px-13 relative z-99999 flex min-h-12 items-center justify-between bg-white px-4 py-2">
            <div>
                <Link href="/">
                    <div className="h-8 w-17.25">
                        <img src="/assets/logo.png" alt="signalx logo" className="h-full w-full object-cover object-center" />
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <a
                    href={socialLinks.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 w-7 cursor-pointer"
                >
                    <img src="/assets/medium.png" className="rounded-full" alt="medium logo" />
                </a>
                <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 w-7 cursor-pointer"
                >
                    <Twitter />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
