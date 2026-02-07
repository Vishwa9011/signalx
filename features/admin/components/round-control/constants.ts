'use client';

import type { ActiveTab } from './types';

export const tabs: { id: ActiveTab; label: string; subtitle: string }[] = [
    { id: 'start', label: 'Start Round', subtitle: 'Begin round with manual oracle values' },
    { id: 'end', label: 'End Round', subtitle: 'Resolve a round with the closing price' },
];
