import { ConnectKitButton } from 'connectkit';
import PositionsView from './PositionsView';
import React from 'react';

function App() {
  return (
    <div className="flex flex-col justify-center items-center m-2">
      <div className="flex justify-center">
        <ConnectKitButton />
      </div>

      <div className='w-2/5 bg-neutral-900 m-2 h-40 rounded-lg'>

      </div>

      <div className='w-full m-4 '>
        <PositionsView />
      </div>


    </div>
  );
}

export default App;
