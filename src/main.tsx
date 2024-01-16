import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import { WagmiConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { config } from './config'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider debugMode>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
