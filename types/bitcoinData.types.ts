export type BitcoinHistoricalDataType = {
    timestamp: string;
    open_price: number;
    low_price: number;
    close_price: number;
    high_price: number;
    avg_price: number;
    avg_confidence: number;
    avg_emaPrice: number;
    avg_emaConfidence: number;
    start_slot: number;
    end_slot: number;
};

export type BitcoinStreamDataType = {
    binary: {
        encoding: string;
        data: string[];
    };
    parsed: {
        id: string;
        price: {
            price: string;
            conf: string;
            expo: number;
            publish_time: number;
        };
        ema_price: {
            price: string;
            conf: string;
            expo: number;
            publish_time: number;
        };
        metadata: {
            slot: number;
            proof_available_time: number;
            prev_publish_time: number;
        };
    }[];
};
