import './index.css';

import { createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

export const config = createConfig(
    getDefaultConfig({
      appName: 'ConnectKit Vite demo',
      //infuraId: import.meta.env.VITE_INFURA_ID,
      //alchemyId:  import.meta.env.VITE_ALCHEMY_ID,
      chains: [mainnet, polygon, optimism, arbitrum],
      walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,
    })
);