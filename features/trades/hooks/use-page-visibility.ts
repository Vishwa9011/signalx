'use client';

import { useEffect, useState } from 'react';

const usePageVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden);
        };
        window.addEventListener('visibilitychange', handleVisibilityChange);
        return () => window.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return isVisible;
};

export default usePageVisibility;
