import React from 'react';
import {useState, useEffect} from 'react';
import { getPublicClient } from '@wagmi/core'

import { config } from './config'
import { uniswapAbi } from './abi'
import { size } from 'viem';
import { string } from 'prop-types';

function PositionsView(props: {onPositionSelected: (id: number, name: string) => void}) {
    const [positions, setPositions] = useState<{id: number, name: string, uri: string}[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<number>(0);


    useEffect(() => {
        const client = config.publicClient;

        const getPositions = async () => {
            const balance = await client.readContract({
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', //uniswap nft positions
                abi: uniswapAbi,
                functionName: 'balanceOf',
                args: ['0x0AA354A392745Bc5f63ff8866261e8B6647002DF'] //test address
            });
            
            const accum: {id: number, name: string, uri: string}[] = [];
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

                const decoded = base64ToJson(uri);
                
                accum.push({id: Number(position), name: decoded.name, uri: decoded.image});
            }
            setPositions(accum);
        }

        getPositions();
    }, []);


    const regularStyle = "hover:outline hover:outline-2 hover:outline-neutral-800 hover:outline-dashed";
    const selectedStyle = "outline outline-4 outline-neutral-800";

    return (
        <div className="flex gap-6 justify-center w-full flex-wrap">
            {positions.map((position) => {
                return (
                    //hover:animate-[wiggle_1s_ease-in-out]
                    <div className={selectedPositionId === position.id ? selectedStyle : regularStyle}
                    onClick={() => {
                        setSelectedPositionId(position.id)
                        props.onPositionSelected(position.id, position.name)
                    }}
                    style={{
                        background: 'url(' + position.uri + ') no-repeat' ,
                        width:290,
                        height:500,
                        borderRadius: 45
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
