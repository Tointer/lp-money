import { ConnectKitButton } from 'connectkit';
import PositionsView from './PositionsView';
import {useState, useEffect} from 'react';
import img from  "./ghoaave.webp"
import { sepolia, useAccount } from 'wagmi';

function App() {
  const [selectedPosition, setSelectedPosition] = 
  useState<{id: number, name: string, mintAmount: number}>({id: 0, name: 'Select position ', mintAmount: 0});

  const account = useAccount();
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center p-2 w-full bg-gradient-to-r from-green-400 to-blue-500">
        <ConnectKitButton />
        <div className='bg-neutral-800 text-neutral-100 rounded-[16px] text-center flex items-center pr-2 ml-2'>
          <img src={img} className='rounded-full size-10'/>
          <b className='text-xl text-neutral-100 text-center'>
              15.56
          </b>
        </div>
      </div>

      <div className='flex flex-col w-full bg-neutral-900 h-40 items-center'>
        <div className='text-s text-opacity-30 text-neutral-100 select-none text-center p-2'>
          {selectedPosition.name}
        </div>
        <button className='text-2xl text-wrap text-neutral-100 text-center p-2 w-fit rounded-[16px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
          Mint {selectedPosition.mintAmount}
        </button>
      </div>

      <div className='w-full m-2 '>
        {account.address !== undefined && <PositionsView onPositionSelected={onPositionSelected} userAccount={account.address}/>}
      </div>


    </div>
  );

  function onPositionSelected(id: number, name: string, mintAmount: number) {
    setSelectedPosition({id, name, mintAmount});
  }


}

export default App;
