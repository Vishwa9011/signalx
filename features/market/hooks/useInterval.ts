'use client';

import { useEffect, useRef } from 'react';

/**
 * Repeatedly calls a callback every `delay` ms. Pass `null` as delay to pause.
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>(() => {});

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;
        const tick = () => savedCallback.current && savedCallback.current();
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
