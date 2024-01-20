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
            state: 'Mint' | 'Repay';
            mintOrRepayAmount: number;
        }
    }) {


    const buttonGradientMint = "from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500";
    const buttonGradientRepay = "from-pink-500 to-yellow-500 hover:from-green-400 hover:to-blue-500";

    const headerGradientMint = "bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%";
    const headerGradientRepay = "bg-gradient-to-tr from-yellow-500 from-10% via-orange-500 via-30% to-pink-400 to-90%";

    return (
        //hover:animate-[wiggle_1s_ease-in-out]
        <div className='drop-shadow-xl'>
            <div className={
                'w-[300px] h-[190px] shadow-inner rounded-t-[40px] flex flex-col items-center pt-4 pl-4 pr-4 '
                + (props.positionData.state === 'Mint' ? headerGradientMint : headerGradientRepay)
            }>
                <div className='w-full h-full border-neutral-300 border-opacity-25 border-2 rounded-t-3xl p-4'>
                    <div className="flex justify-center relative">
                        <img className="bg-white border-white border-2 border-opacity-80 rounded-full absolute left-4 drop-shadow-lg" src={"https://coinicons-api.vercel.app/api/icon/" + props.positionData.token0.toLowerCase()}/>
                        <img className="bg-white border-white border-2 border-opacity-80 rounded-full absolute right-4 drop-shadow-lg" src={"https://coinicons-api.vercel.app/api/icon/" + props.positionData.token1.toLowerCase()}/>
                    </div>
                </div>
            </div>
            <div className='bg-slate-800 h-[230px] w-[300px] rounded-b-[40px] flex flex-col items-center justify-between text-neutral-100 text-xl pb-4'>
                <div className='flex flex-col items-stretch w-full'>
                    <div className='text-gray-500 w-full text-sm text-nowrap text-clip overflow-hidden'> {Array(6).fill([props.positionData.token0 + " ", props.positionData.token1 + " "]).flat()} </div>
                    <div className='pl-4 pt-4 '>
                        <div className='text-3xl'><b className='text-gray-400'>ID:</b> {props.positionData.id}</div>
                        <div><b className='text-gray-400'>Price Range:</b> {props.positionData.priceRange[0]}-{props.positionData.priceRange[1]}</div>
                        <div><b className='text-gray-400'>Fee:</b> {props.positionData.feeBracket}</div>
                    </div>
                </div>
                <div>
                    <button className={
                        'pr-4 pl-4 p-2 text-3xl self-center text-wrap text-neutral-100 text-center w-fit transition ease-in-out delay-150 rounded-[16px] bg-gradient-to-r hover:-translate-y-1 hover:scale-110 duration-300 '
                        + (props.positionData.state === 'Mint' ? buttonGradientMint : buttonGradientRepay)
                    } onClick={() => props.onButtonClick(props.positionData.id)
                    }>
                        {props.positionData.state} {props.positionData.mintOrRepayAmount}
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
