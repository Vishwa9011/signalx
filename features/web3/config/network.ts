import type { Address } from 'viem';
import { DEFAULT_NETWORK } from '@/features/web3/providers/Web3Provider';

type NetworkConfig = {
    token: Address;
    contract: Address;
    decimals: number;
};

export const NETWORK_CONFIG: Record<number, NetworkConfig> = {
    11155111: {
        decimals: 6,
        token: '0x4129f5924F53E621F07296045b1FBeD35C803940',
        contract: '0x9f0ab166643490698a9586481C299eF6d0fc86c0',
    },
    97: {
        decimals: 6,
        token: '0x6BFEE7b9AEB25eb5870199B071f23Cdd44d1329F',
        contract: '0x48E944666866a462A9E033B53eC79C2cDc7B9FD9',
    },
};

export const getNetworkConfig = (chainId?: number) => {
    if (chainId == undefined || chainId == null) {
        return NETWORK_CONFIG[DEFAULT_NETWORK.id];
    }

    if (!NETWORK_CONFIG[chainId]) {
        throw new Error(`Unsupported network with chainId: ${chainId}`);
    }

    return NETWORK_CONFIG[chainId];
};
