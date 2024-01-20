import { ConnectKitButton } from 'connectkit';
import PositionsView from './components/PositionsView';
import {useState, useEffect} from 'react';
import img from  "./ghoaave.webp"
import logo from "./logo.png"
import { sepolia, useAccount } from 'wagmi';
import {useErc20BalanceOf} from './generated'
import { formatDecimals } from './utils/contracts';

function App() {
  const account = useAccount();
  const GHOBalance = useErc20BalanceOf({args: [account.address??"0x0"]});
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center p-2 w-full bg-gradient-to-r from-green-400 to-blue-500 relative">
        <div className='h-12 absolute left-2 top-1'>
          <img src={logo} className='h-12'/>
        </div>
        <ConnectKitButton />
        <div className='bg-neutral-800 text-neutral-100 rounded-[16px] text-center flex items-center pr-2 ml-2'>
          <img src={img} className='rounded-full size-10'/>
          <b className='text-xl text-neutral-100 text-center'>
            {formatDecimals(GHOBalance.data?? BigInt(0), 18)}
          </b>
        </div>
      </div>

      <div className='flex flex-col w-full bg-neutral-900 text-gray-500 text-2xl h-24 justify-center text-nowrap text-clip overflow-hidden select-none'>
      LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY LP MONEY
      </div>

      <div className='w-full m-2 '>
        {account.address !== undefined && <PositionsView userAccount={account.address} onGHOBalanceChange={refetchBalance}/>}
      </div>


    </div>
  );

  function refetchBalance() {
    console.log("refetching balance");
    GHOBalance.refetch();
  }

}

export default App;
