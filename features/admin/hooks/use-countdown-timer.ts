'use client';

import { useEffect, useState, useRef } from 'react';

type CountdownFormat = 'long' | 'short';

type CountdownReturn = {
    timeLeft: string;
    progress: number;
};

const useCountdownTimer = (endTime: number, format: CountdownFormat = 'long', startTime?: number): CountdownReturn => {
    const [timeLeft, setTimeLeft] = useState(format === 'long' ? '00 mins 00 secs' : '00:00');
    const [progress, setProgress] = useState(100);

    const rafIdRef = useRef<number | null>(null);
    const lastUpdateRef = useRef<number>(0);

    useEffect(() => {
        const updateCountdown = (timestamp: number) => {
            // Update every ~1000ms
            if (timestamp - lastUpdateRef.current < 1000) {
                rafIdRef.current = requestAnimationFrame(updateCountdown);
                return;
            }

            lastUpdateRef.current = timestamp;
            const now = Date.now();
            const diff = endTime - now;

            if (diff > 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                const mm = String(minutes).padStart(2, '0');
                const ss = String(seconds).padStart(2, '0');

                const formatted = format === 'long' ? `${mm} mins ${ss} secs` : `${mm}:${ss}`;

                setTimeLeft(formatted);

                // Calculate progress: 100% when timer starts, 0% when it ends
                if (startTime && startTime < endTime) {
                    const totalDuration = endTime - startTime;
                    const remainingTime = endTime - now;
                    const progressPercentage = Math.max(0, Math.min(100, (remainingTime / totalDuration) * 100));
                    setProgress(progressPercentage);
                } else {
                    setProgress(100);
                }

                rafIdRef.current = requestAnimationFrame(updateCountdown);
            } else {
                setTimeLeft(format === 'long' ? '00 mins 00 secs' : '00:00');
                setProgress(100); // Full circle when time is up (00:00)
            }
        };

        rafIdRef.current = requestAnimationFrame(updateCountdown);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [endTime, format, startTime]);

    return { timeLeft, progress };
};

export default useCountdownTimer;
