import React from 'react';
import {useState, useEffect} from 'react';
import { getPublicClient } from '@wagmi/core'

import { config } from './config'
import { uniswapAbi } from './abi'
import { size } from 'viem';

function PositionsView() {
    const [positions, setPositions] = useState<{id: number, uri: string}[]>([]);
    useEffect(() => {
        const client = config.publicClient;

        const getPositions = async () => {
            const balance = await client.readContract({
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', //uniswap nft positions
                abi: uniswapAbi,
                functionName: 'balanceOf',
                args: ['0x0AA354A392745Bc5f63ff8866261e8B6647002DF'] //test address
            });
            
            const accum: {id: number, uri: string}[] = [];
            for (let i = 0; i < balance; i++) {
                const position = await client.readContract({
                    address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', //uniswap nft positions
                    abi: uniswapAbi,
                    functionName: 'tokenOfOwnerByIndex',
                    args: ['0x0AA354A392745Bc5f63ff8866261e8B6647002DF', BigInt(i)] //test address
                });
                const uri = await client.readContract({
                    address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', //uniswap nft positions
                    abi: uniswapAbi,
                    functionName: 'tokenURI',
                    args: [position] 
                });

                const svgEncoded = base64ToJson(uri).image;
                
                accum.push({id: Number(position), uri: svgEncoded});
            }
            setPositions(accum);
        }

        getPositions();
    }, []);


    return (
        <div className="flex gap-6 justify-center w-full flex-wrap">
            {positions.map((position) => {
                return (
                    //hover:animate-[wiggle_1s_ease-in-out]
                    <div className="hover:outline  hover:outline-[6px] outline-neutral-800" style={{
                        background: 'url(' + position.uri + ') no-repeat' ,
                        width:290,
                        height:500,
                        borderRadius: 44
                    }}
                    key={position.id} />
                )
            })}
        </div>
    );
}

function base64ToJson(base64String: string):any {
    const json = atob(base64String.split(',')[1]);
    return JSON.parse(json);
}

export default PositionsView;
