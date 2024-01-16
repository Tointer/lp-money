import React from 'react';
import {useState, useEffect} from 'react';
import { getPublicClient } from '@wagmi/core'

import { config } from './config'
import { uniswapAbi } from './abi'

function PositionsView() {
    const [positions, setPositions] = useState<number[]>([]);
    useEffect(() => {
        const client = config.publicClient;

        const getPositions = async () => {
            const balance = await client.readContract({
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', //uniswap nft positions
                abi: uniswapAbi,
                functionName: 'balanceOf',
                args: ['0x0AA354A392745Bc5f63ff8866261e8B6647002DF'] //test address
            });
            
            const accum = [];
            for (let i = 0; i < balance; i++) {
                const position = await client.readContract({
                    address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', //uniswap nft positions
                    abi: uniswapAbi,
                    functionName: 'tokenOfOwnerByIndex',
                    args: ['0x0AA354A392745Bc5f63ff8866261e8B6647002DF', BigInt(i)] //test address
                });
                accum.push(Number(position));
            }
            setPositions(accum);
        }

        getPositions();
    }, []);


    return (
        <div className="text-3xl font-bold underline"
        >
            BRRR
        </div>
    );
}

export default PositionsView;
