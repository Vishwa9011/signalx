'use client';

import Link from 'next/link';

const PageNotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <h1 className="mb-4 text-5xl font-bold text-slate-800">404</h1>
            <p className="mb-6 text-lg text-slate-500">Sorry, the page you are looking for does not exist.</p>
            <Link
                href="/"
                className="rounded bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
            >
                Go Home
            </Link>
        </div>
    );
};

export default PageNotFound;
