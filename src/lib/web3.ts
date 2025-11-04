import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

// Fallback project ID for development
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2f5a2b1c8d3e4f5a6b7c8d9e0f1a2b3c';

export const config = getDefaultConfig({
  appName: 'Ripple Finance',
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NODE_ENV === 'development' ? [sepolia] : []),
  ],
  ssr: true,
});