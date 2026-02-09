'use client';

import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';

type UseCopyToClipboard = {
    isCopied: boolean;
    copyToClipboard: (text: string) => void;
};

const useCopyToClipboard = (delay = 1000): Readonly<UseCopyToClipboard> => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback((text: string) => {
        if (typeof text !== 'string' || text.trim() === '') {
            console.warn('Cannot copy invalid or empty text');
            return;
        }

        const result = copy(text);
        setIsCopied(result);

        if (!result) {
            console.error('Failed to copy text to clipboard');
        }
    }, []);

    useEffect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                setIsCopied(false);
            }, delay);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isCopied, delay]);

    return Object.freeze({ isCopied, copyToClipboard });
};

export default useCopyToClipboard;
