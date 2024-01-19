import React from 'react';
import {useState, useEffect} from 'react';
import { getPublicClient } from '@wagmi/core'

import { config } from './config'
import { lpMoney, uniswapAbi } from './abi'
import { size } from 'viem';
import { string } from 'prop-types';
import {abi as lpMoneyAbi} from '../contracts/out/LPMoney.sol/LPMoney.json'

const lpMoneyContract = '0xdaafc1f3b2c19bc1d3ca5602c4394f82387951b5';
const mockGHO = '0x75b1f376006E9B031D7E2BE3d58e97B64bcbb2A5';
const uniV3Collection = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88';

function PositionsView(props: {onPositionSelected: (id: number, name: string) => void, userAccount: `0x${string}`}) {
    const [positions, setPositions] = useState<{id: number, name: string, uri: string, available: number}[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<number>(0);


    useEffect(() => {
        const client = config.publicClient;

        const getPositions = async () => {
            const balance = await client.readContract({
                address: uniV3Collection,
                abi: uniswapAbi,
                functionName: 'balanceOf',
                args: [props.userAccount]
            });
            
            const accum: {id: number, name: string, uri: string, available: number}[] = [];
            for (let i = 0; i < balance; i++) {
                const position = await client.readContract({
                    address: uniV3Collection,
                    abi: uniswapAbi,
                    functionName: 'tokenOfOwnerByIndex',
                    args: [props.userAccount, BigInt(i)] 
                });
                console.log("position", position);
                const uri = await client.readContract({
                    address: uniV3Collection,
                    abi: uniswapAbi,
                    functionName: 'tokenURI',
                    args: [position] 
                });
                const mintAmount = await client.readContract({
                    address: lpMoneyContract,
                    abi: lpMoney,
                    functionName: 'previewMint',
                    args: [position] 
                });
                const mintAmountFormatted = Number(mintAmount/(BigInt(10)**BigInt(16)))/100;
                

                const decoded = base64ToJson(uri);
                
                accum.push({
                    id: Number(position), 
                    name: decoded.name, 
                    uri: decoded.image, 
                    available: mintAmountFormatted
                });
            }
            setPositions(accum);
        }

        getPositions();
    }, [props.userAccount]);


    const regularStyle = "hover:outline hover:outline-2 hover:outline-neutral-800 hover:outline-dashed";
    const selectedStyle = "outline outline-4 outline-neutral-800";

    return (
        <div className="flex gap-4 justify-center w-full flex-wrap">
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
