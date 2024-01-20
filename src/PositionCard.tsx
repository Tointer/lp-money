import React from 'react';
import {useState, useEffect} from 'react';


function PositionCard(
    props: {
        onButtonClick: (id: number) => void, 
        positionData: {
            id: number;
            token0: string;
            token1: string;
            feeBracket: string;
            priceRange: [number, number];
            state: 'mint' | 'repay';
            mintOrRepayAmount: number;
        }
    }) {

    const regularStyle = "hover:outline hover:outline-2 hover:outline-neutral-800 hover:outline-dashed";
    const selectedStyle = "outline outline-4 outline-neutral-800";

    return (
        //hover:animate-[wiggle_1s_ease-in-out]
        <div>
            <div className='w-[300px] h-[190px] rounded-t-[40px] bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex flex-col items-center pt-4 pl-4 pr-4'>
                <div className='w-full h-full border-neutral-300 border-opacity-25 border-2 rounded-t-3xl p-4'>
                    <div className="flex justify-center relative">
                        <img className="absolute left-4" src={"https://coinicons-api.vercel.app/api/icon/" + props.positionData.token0.toLowerCase()}/>
                        <img className="absolute right-4" src={"https://coinicons-api.vercel.app/api/icon/" + props.positionData.token1.toLowerCase()}/>
                    </div>
                </div>
            </div>
            <div className='bg-slate-800 h-[300px] w-[300px] rounded-b-[40px] flex flex-col items-center justify-between text-neutral-100 text-xl pb-4'>
                <div className='flex flex-col items-stretch w-full'>
                    <div className='text-gray-500 w-full text-nowrap text-clip overflow-hidden'> USDC USDT USDC USDT USDC USDT USDC USDT USDC USDT </div>
                    <div className='pl-4 pt-4 '>
                        <div className='text-3xl'><b className='text-gray-400'>ID:</b> {props.positionData.id}</div>
                        <div><b className='text-gray-400'>Price Range:</b> {props.positionData.priceRange[0]}-{props.positionData.priceRange[1]}</div>
                        <div><b className='text-gray-400'>Fee:</b> {props.positionData.feeBracket}</div>
                    </div>
                </div>
                <div>
                    <button className='text-2xl self-center text-wrap text-neutral-100 text-center p-2 w-fit rounded-[16px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        Mint {props.positionData.mintOrRepayAmount}
                    </button>
                </div>
            </div>
        </div>
    );
}

function base64ToJson(base64String: string):any {
    const json = atob(base64String.split(',')[1]);
    return JSON.parse(json);
}

export default PositionCard;
