import { ConnectKitButton } from 'connectkit';
import PositionsView from './PositionsView';
import React from 'react';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ConnectKitButton />
      <PositionsView />
    </div>
  );
}

export default App;
