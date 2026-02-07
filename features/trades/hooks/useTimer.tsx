'use client';

import { useEffect, useRef, useState } from 'react';
import { formatSeconds } from '@/lib';

export default function useTimer(initialSeconds: number) {
    const totalDurationMs = initialSeconds * 1000;

    const rafIdRef = useRef<number | null>(null);
    const startTimestampRef = useRef<number | null>(null);

    const [remainingMs, setRemainingMs] = useState(totalDurationMs);

    useEffect(() => {
        startTimestampRef.current = null;
        setRemainingMs(totalDurationMs);

        const updateTimer = (currentTimestamp: number) => {
            if (startTimestampRef.current === null) {
                startTimestampRef.current = currentTimestamp;
            }

            const elapsed = currentTimestamp - startTimestampRef.current;
            const msLeft = Math.max(totalDurationMs - elapsed, 0);

            setRemainingMs(msLeft);

            if (msLeft > 0) {
                rafIdRef.current = requestAnimationFrame(updateTimer);
            }
        };

        rafIdRef.current = requestAnimationFrame(updateTimer);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [totalDurationMs]);

    const remainingSeconds = Math.floor(remainingMs / 1000);

    return {
        timeLeft: remainingSeconds,
        short: formatSeconds(remainingSeconds, 'short'),
        long: formatSeconds(remainingSeconds, 'long'),
    };
}
