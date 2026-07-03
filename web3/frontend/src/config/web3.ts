import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';
import { http } from 'wagmi';

export const localChain = {
  id: 31337,
  name: 'Hardhat Local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Hardhat Local',
      url: 'http://127.0.0.1:8545',
    },
  },
  testnet: true,
};

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '31337');

const targetChain =
  CHAIN_ID === sepolia.id ? sepolia : CHAIN_ID === mainnet.id ? mainnet : localChain;

export const config = getDefaultConfig({
  appName: 'Real Estate DApp',
  projectId: 'real-estate-dapp',
  chains: [targetChain, localChain, sepolia, mainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
    [localChain.id]: http(process.env.NEXT_PUBLIC_LOCAL_RPC || 'http://127.0.0.1:8545'),
  },
  ssr: false,
});