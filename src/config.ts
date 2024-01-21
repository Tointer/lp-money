import './index.css';

import { createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

export const config = createConfig(
    getDefaultConfig({
      appName: 'LP Money',
      chains: [arbitrum, mainnet],
      walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,
    })
);