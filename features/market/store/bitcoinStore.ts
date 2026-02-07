// src/store/bitcoinStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PricePoint = {
    x: number; // timestamp (ms)
    y: number; // price
};

export type BitcoinStateType = {
    points: PricePoint[];
    bufferPoints: PricePoint[];
    hasInitialized: boolean;
    refreshKey: number;
    isLoading: boolean;
    isTransitioning: boolean;

    addPoint: (point: PricePoint, windowMinutes: number) => void;
    bufferPoint: (point: PricePoint) => void;
    applyBufferedPoints: (windowMinutes: number) => void;
    replacePointsAtomically: (data: PricePoint[]) => void;
    setInitialData: (data: PricePoint[]) => void;
    setHasInitialized: (value: boolean) => void;
    clearPoints: () => void;
    incrementRefreshKey: () => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsTransitioning: (val: boolean) => void;
};

// No normalization needed - chart will use blockchain basePrice

export const bitcoinStore = create<BitcoinStateType>()(
    persist(
        set => ({
            points: [],
            bufferPoints: [],
            hasInitialized: false,
            refreshKey: 0,
            isLoading: false,
            isTransitioning: false,

            incrementRefreshKey: () => set(state => ({ refreshKey: state.refreshKey + 1 })),

            addPoint: (point: PricePoint, windowMinutes: number) =>
                set(state => {
                    if (state.isTransitioning) {
                        return { bufferPoints: [...state.bufferPoints, point] };
                    }

                    const last = state.points[state.points.length - 1];
                    if (last && last.x === point.x) return state;

                    const newPoints = [...state.points, point];
                    const windowMs = (windowMinutes || 60) * 60 * 1000;
                    const minX = point.x - windowMs;
                    const trimmed = newPoints.filter(p => p.x >= minX);

                    return { points: trimmed };
                }),

            bufferPoint: (point: PricePoint) =>
                set(state => ({
                    bufferPoints: [...state.bufferPoints, point],
                })),

            applyBufferedPoints: (windowMinutes: number) =>
                set(state => {
                    if (!state.bufferPoints.length) return state;

                    const merged = [...state.points, ...state.bufferPoints]
                        .sort((a, b) => a.x - b.x)
                        .filter((v, i, arr) => i === 0 || arr[i - 1].x !== v.x);

                    const windowMs = (windowMinutes || 60) * 60 * 1000;
                    const minX = merged[merged.length - 1].x - windowMs;
                    const trimmed = merged.filter(p => p.x >= minX);

                    return { points: trimmed, bufferPoints: [] };
                }),

            replacePointsAtomically: (data: PricePoint[]) =>
                set(() => {
                    const merged = [...data]
                        .sort((a, b) => a.x - b.x)
                        .filter((v, i, arr) => i === 0 || arr[i - 1].x !== v.x);

                    return { points: merged, bufferPoints: [] };
                }),

            setInitialData: (data: PricePoint[]) =>
                set(() => ({
                    points: data,
                })),

            setHasInitialized: (value: boolean) => set({ hasInitialized: value }),
            clearPoints: () => set({ points: [] }),
            setIsLoading: (isLoading: boolean) => set({ isLoading }),
            setIsTransitioning: (val: boolean) => set({ isTransitioning: val }),
        }),
        {
            name: 'bitcoin-data',
            partialize: state => ({
                points: state.points,
                isTransitioning: state.isTransitioning,
            }),
        },
    ),
);
