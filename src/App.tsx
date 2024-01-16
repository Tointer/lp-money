import { ConnectKitButton } from 'connectkit';
import PositionsView from './PositionsView';
import {useState, useEffect} from 'react';
import img from  "./ghoaave.webp"

function App() {
  const [selectedPosition, setSelectedPosition] = useState<{id: number, name: string}>
  ({id: 0, name: 'Select position'});
  

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <div className="flex justify-center">
        <ConnectKitButton />
        <div className='bg-neutral-800 text-neutral-100 rounded-[16px] text-center flex items-center pr-2 ml-2'>
          <img src={img} className='rounded-full size-10'/>
          <b className='text-xl text-neutral-100 text-center'>
              15.56
          </b>
        </div>
      </div>

      <div className='w-full bg-neutral-900 m-2 h-40'>
        <div className='text-3xl text-neutral-100 text-center p-2'>
          {selectedPosition.name}
        </div>
      </div>

      <div className='w-full m-2 '>
        <PositionsView onPositionSelected={(id: number, name: string) => setSelectedPosition({id, name})} />
      </div>


    </div>
  );
}

export default App;
