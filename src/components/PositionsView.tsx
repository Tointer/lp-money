import React from 'react';
import {useState, useEffect} from 'react';
import { useWaitForTransaction } from 'wagmi'

import { config } from '../config'
import {
    lpMoneyABI, erc721ABI, useLpMoneyGetAllUniswapPositionsOf, useLpMoneyGetAllPositionsOf,
    useLpMoneyMint, useErc721IsApprovedForAll, useErc721SetApprovalForAll, useLpMoneyClose,
    useErc20Allowance, useErc20Approve
} from '../generated'
import { size } from 'viem';
import { string } from 'prop-types';
import PositionCard from './PositionCard';
import {arbitrumContracts} from '../data/contractAddresses.json';

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

function PositionsView(props: {userAccount: `0x${string}`, onGHOBalanceChange: () => void}) {
    const [positions, setPositions] = useState<Position[]>([]);
    const [lastId, setLastId] = useState<number>(0);

    //Get all positions
    const UniPositions = useLpMoneyGetAllUniswapPositionsOf({args: [props.userAccount]});
    const LpMoneyPositions = useLpMoneyGetAllPositionsOf({args: [props.userAccount]});

    //nft Approval 
    const ApprovedForAll = useErc721IsApprovedForAll({args: [props.userAccount, arbitrumContracts.lpMoney as `0x${string}`]});
    const {writeAsync: writeApproval, error: errorApproval, data: dataApproval} = useErc721SetApprovalForAll();
    const waitApproval = useWaitForTransaction({hash: dataApproval?.hash})

    //Gho token approval
    const {data: allowance, error: allowanceError} = useErc20Allowance({args: [props.userAccount, lpMoneyContract]});
    const {writeAsync: writeApprove, error: errorApprove, data: dataApprove} = useErc20Approve();
    const waitApprove = useWaitForTransaction({hash: dataApprove?.hash})


    //Mint
    const {writeAsync: writeMint, error: errorMint, data: dataMint} = useLpMoneyMint();
    const waitMint = useWaitForTransaction({hash: dataMint?.hash})

    //Repay
    const {writeAsync: writeClose, error: errorClose, data: dataClose} = useLpMoneyClose();
    const waitClose = useWaitForTransaction({hash: dataClose?.hash})


    async function onButtonClick(id: number) {
        console.log("clicked on: " + id);
        setLastId(id);
        const state = positions.find((position) => position.id === id)?.state;

        if(state=== 'Mint') {
            if(ApprovedForAll.data === undefined) return;
            if(!ApprovedForAll.data) {
                await writeApproval({args: [arbitrumContracts.lpMoney as `0x${string}`, true]});
            } else {
                await writeMint({args: [BigInt(id)]});
            }
        }
        else if(state === 'Repay') {
            if(allowance === undefined) return;
            if(allowance < BigInt(10)**BigInt(30)) {
                await writeApprove({args: [lpMoneyContract, BigInt(10)**BigInt(30)]});
            } else {
                await writeClose({args: [BigInt(id)]});
            }
        }
    }

    //mint after nft approval
    useEffect(() => {
        if(waitApproval.status === 'success') {
            writeMint({args: [BigInt(lastId)]});
        }
    }
    , [waitApproval.status])

    //repay after gho approval
    useEffect(() => {
        if(waitApprove.status === 'success') {
            writeClose({args: [BigInt(lastId)]});
        }
    }, [waitApprove.status])

    //update after mint
    useEffect(() => {
        if(waitMint.status === 'success') {
            props.onGHOBalanceChange();
            const positionsCopy = [...positions];
            const positionIndex = positionsCopy.findIndex((position) => position.id === lastId);
            positionsCopy[positionIndex].state = 'Repay';
            setPositions(positionsCopy);
        }
    }
    , [waitMint.status])

    //update after repay
    useEffect(() => {
        if(waitClose.status === 'success') {
            props.onGHOBalanceChange();
            const positionsCopy = [...positions];
            const positionIndex = positionsCopy.findIndex((position) => position.id === lastId);
            positionsCopy[positionIndex].state = 'Mint';
            setPositions(positionsCopy);
        }
    }, [waitClose.status])
    
    //get positions
    useEffect(() => {
        const client = config.publicClient;
        if(UniPositions.data === undefined) return;
        const positions: {id: bigint, state: 'Mint'|'Repay'}[] = UniPositions.data.map((position) => {
            return {id: position, state: 'Mint'};
        });

        if(LpMoneyPositions.data !== undefined){
            const lpMoneyPositions: {id: bigint, state: 'Mint'|'Repay'}[] = LpMoneyPositions.data.map((position) => { 
                return {id: position, state: 'Repay'};
            });
            positions.push(...lpMoneyPositions);
            positions.sort((a, b) => Number(a.id - b.id));
        }

        const getPositions = async () => {

            const accum: Position[] = [];
            for (let i = 0; i < positions.length; i++) {
                const positionId = positions[i].id;
                console.log(Number(positionId));
                const uri = await client.readContract({
                    address: uniV3Collection,
                    abi: erc721ABI,
                    functionName: 'tokenURI',
                    args: [positionId] 
                });
                let mintAmount: bigint;

                try {
                    mintAmount = await client.readContract({
                        address: lpMoneyContract,
                        abi: lpMoneyABI,
                        functionName: 'previewMint',
                        args: [positionId] 
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
                    id: Number(positionId), 
                    token0: positionInfo.token0,
                    token1:  positionInfo.token1,
                    feeBracket: positionInfo.feeBracket,
                    priceRange: positionInfo.priceRange,
                    state: positions[i].state,
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



export default PositionsView;
