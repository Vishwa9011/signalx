import axios from 'axios';
import { axiosInstance } from './requestHandler';
import { useRoundStore } from '@/features/market/store/roundStore';
import { env } from '@/lib';
import type { MessageType } from '@/lib/message-state';

type ErrorMessageType = {};

export interface RoundResponse {
    isRunning: boolean;
    roundEndGlobal: number;
    roundStartGlobal: number;
    currentWaitTimeGlobal: number;
    waitTimeSavedAt: number;
    currentBtcPriceGlobal: number;
    currentMessageGlobal: MessageType;
    errorMessage: ErrorMessageType | null;
}

axios.defaults.baseURL = env.NEXT_PUBLIC_BASE_URL ?? '';

export const getRoundDetails = async () => {
    const response = await axiosInstance.get('/round');
    return response.data.data as RoundResponse;
};

export const handleFetchRoundDetails = async () => {
    try {
        const response = await axiosInstance.get('/round');
        if (response.data.success) {
            const data = response.data.data as RoundResponse;
            const { setCurrentState, setCountdownTime } = useRoundStore.getState();
            setCurrentState(data.currentMessageGlobal);
            if (data.currentWaitTimeGlobal > 0) {
                const elapsedTime = Date.now() / 1000 - data.waitTimeSavedAt;
                const remainingTime = data.currentWaitTimeGlobal - elapsedTime;
                setCountdownTime(remainingTime > 0 ? remainingTime : 0);
            }
        }
    } catch (error) {
        console.error('Error fetching Round Details ', error);
    }
};

export const operateRound = async () => {
    await axiosInstance.post(`/run`);
};

export async function getPythPriceForTimestamp(timestamp: number) {
    try {
        const response = await axios.get(
            `https://hermes.pyth.network/v2/updates/price/${timestamp}?ids%5B%5D=e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43`,
        );
        const rawPrice = response.data.parsed?.[0].price?.price;
        const expo = response.data.parsed?.[0].price?.expo;
        const price = rawPrice * Math.pow(10, expo);
        return Math.floor(price * 10000);
    } catch (error) {
        return null;
    }
}

export async function getPythLatestPrice() {
    try {
        const response = await axios.get(
            'https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
        );
        const parsed = response.data.parsed?.[0];
        const rawPrice = parsed.price?.price;
        const expo = parsed.price?.expo;
        const price = rawPrice * Math.pow(10, expo);
        return {
            price: Math.floor(price * 10000),
            timestamp: parsed.price?.publish_time ?? 0,
        };
    } catch (error) {
        return null;
    }
}
