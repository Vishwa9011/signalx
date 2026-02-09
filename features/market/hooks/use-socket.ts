'use client';

import { env, type MessageType } from '@/lib';
import { bitcoinStore } from '@/features/market/store/bitcoinStore';
import { useRoundStore } from '@/features/market/store/roundStore';
import type { BackendPricePointType } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// If types must be local (recommended), just duplicate type file in frontend.

export interface ServerToClientEvents {
    notification: (data: { message: string; timestamp: number }) => void;
    price_update: (data: BackendPricePointType) => void;
}

export interface ClientToServerEvents {
    ping: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

type Message = {
    type: MessageType;
    time: number;
};

const refetchTypes = ['BETTING_OPENED', 'MINING', 'STARTING_NEW_ROUND'] as MessageType[];

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);

    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    useEffect(() => {
        const socket = io(env.NEXT_PUBLIC_API_URL ?? '', {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            setIsConnected(true);
            // console.log('🟢 Connected:', socket.id);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            // console.log('🔴 Disconnected');
        });

        // Listen for backend notifications
        socket.on('notification', (notification: Message) => {
            if (refetchTypes.includes(notification.type)) {
                useRoundStore.getState().triggerRoundRefetch();
            }
            useRoundStore.getState().setCountdownTime(notification.time);
            useRoundStore.getState().setCurrentState(notification.type);
            // console.log('📢 Notification:', notification);
        });

        // Listen for real-time price updates from backend
        socket.on('price_update', (priceData: BackendPricePointType) => {
            const isTransitioning = bitcoinStore.getState().isTransitioning;

            // Convert backend format to frontend format
            const point = {
                x: priceData.timestamp * 1000,
                y: priceData.price / 10000,
            };

            if (isTransitioning) {
                bitcoinStore.getState().bufferPoint(point);
            } else {
                bitcoinStore.getState().addPoint(point, 60); // Use default 60 minute window
            }
            // console.log('💰 Price Update:', point);
        });

        return () => {
            socket.off('notification');
            socket.off('price_update');
            socket.disconnect();
        };
    }, []);

    const emitPing = () => {
        socketRef.current?.emit('ping');
    };

    useEffect(() => {
        if (isConnected) {
            emitPing();
        }
    }, [isConnected]);

    return {
        isConnected,
        emitPing,
        socket: socketRef.current,
    };
};
