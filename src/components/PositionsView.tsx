import React from 'react';
import {useState, useEffect} from 'react';
import { getPublicClient } from '@wagmi/core'

import { config } from '../config'
import {lpMoneyABI, erc721ABI, useLpMoneyGetAllUniswapPositionsOf, useErc721Mint} from '../generated'
import { size } from 'viem';
import { string } from 'prop-types';
import PositionCard from './PositionCard';
import { useContractWrite } from 'wagmi' 

const lpMoneyContract = '0xdaafc1f3b2c19bc1d3ca5602c4394f82387951b5';
const mockGHO = '0x75b1f376006E9B031D7E2BE3d58e97B64bcbb2A5';
const uniV3Collection = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88';

interface Position {
    id: number;
    token0: string, 
    token1: string, 
    feeBracket: string, 
    priceRange: [number, number]
    state: 'Mint' | 'Repay';
    mintAmount: number;
}

function PositionsView(props: {userAccount: `0x${string}`}) {
    const [positions, setPositions] = useState<Position[]>([]);
    const UniPositions = useLpMoneyGetAllUniswapPositionsOf({args: [props.userAccount]});
    

    useEffect(() => {
        const client = config.publicClient;
        if(UniPositions.data === undefined) return;
        const positions = UniPositions.data;
        

        const getPositions = async () => {

            const accum: Position[] = [];
            for (let i = 0; i < positions.length; i++) {
                console.log(Number(positions[i]));
                const uri = await client.readContract({
                    address: uniV3Collection,
                    abi: erc721ABI,
                    functionName: 'tokenURI',
                    args: [positions[i]] 
                });
                let mintAmount: bigint;

                try {
                    mintAmount = await client.readContract({
                        address: lpMoneyContract,
                        abi: lpMoneyABI,
                        functionName: 'previewMint',
                        args: [positions[i]] 
                    });
                } catch (e) {
                    console.log("error", e);
                    continue;
                }

                const mintAmountFormatted = Number(mintAmount/(BigInt(10)**BigInt(16)))/100;
                if(mintAmountFormatted < 0.01) continue;
                

                const decoded = base64ToJson(uri);
                const positionInfo = parsePositionName(decoded.name);
                
                const positionObject: Position = {
                    id: Number(positions[i]), 
                    token0: positionInfo.token0,
                    token1:  positionInfo.token1,
                    feeBracket: positionInfo.feeBracket,
                    priceRange: positionInfo.priceRange,
                    state: 'Mint',
                    mintAmount: mintAmountFormatted,
                }

                accum.push(positionObject);
            }
            setPositions(accum);
        }

        getPositions();
    }, [props.userAccount, UniPositions.data]);

    return (
        <div className="flex gap-4 justify-center w-full flex-wrap p-4">
            {positions.map((position, id) => {
                return (
                    <PositionCard 
                        onButtonClick={onButtonClick} 
                        positionData={{
                            id: position.id, 
                            token0: position.token0,
                            token1:  position.token1,
                            feeBracket: position.feeBracket,
                            priceRange: position.priceRange,
                            state: position.state,
                            mintOrRepayAmount: position.mintAmount,
                        }}
                        key={id}
                    />
                )
            })}
        </div>
    );
}

function parsePositionName(name: string): {token0: string, token1: string, feeBracket: string, priceRange: [number, number]} {
    const split = name.split('-');
    const feeBracket = split[1];
    const tokens = split[2].trim().split('/');
    const priceRangeArray = split[3].trim().split('<>').map((price) => Number(price));

    return { token0: tokens[0], token1: tokens[1], feeBracket, priceRange: [priceRangeArray[0], priceRangeArray[1]] };
}

function base64ToJson(base64String: string):any {
    const json = atob(base64String.split(',')[1]);
    return JSON.parse(json);
}

function onButtonClick(id: number) {
    console.log(id);
}


export default PositionsView;
