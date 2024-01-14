// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IGhoToken} from './interfaces/IGhoToken.sol';
import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {ILPpriceOracle} from './interfaces/ILPpriceOracle.sol';
import {PoolAddress} from "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";

contract LPMoney {

    struct PositionInfo{
        uint64 index;
        uint192 amountMinted; 
    }

    address private ghoTokenAddress;
    address private uniswapFactory;
    INonfungiblePositionManager private nftPositionManager;
    ILPpriceOracle private priceOracle;

    mapping(address owner => uint[]) private _ownedTokens;
    mapping(uint tokenId => PositionInfo) private _ownedTokensIndex;

    constructor(
        address _uniswapFactory, 
        address _ghoTokenAddress, 
        INonfungiblePositionManager _nftPositionManager, 
        ILPpriceOracle _lpPriceOracle
    ) {
        uniswapFactory = _uniswapFactory;
        ghoTokenAddress = _ghoTokenAddress;
        nftPositionManager = _nftPositionManager;
        priceOracle = _lpPriceOracle;
    }

    function liquidate(uint collateralNftId) public {
        
    }

    function mint(uint collateralNftId) public {
        nftPositionManager.transferFrom(msg.sender, address(this), collateralNftId);
        
        uint amount = getMintAmount(collateralNftId);
        _ownedTokens[msg.sender].push(collateralNftId);
        _ownedTokensIndex[collateralNftId] = PositionInfo(uint64(_ownedTokens[msg.sender].length - 1), uint192(amount));

        IGhoToken(ghoTokenAddress).mint(msg.sender, amount);
    }

    function getUniswapPool(address token0, address token1, uint24 fee) public view returns (IUniswapV3Pool) {
        return IUniswapV3Pool(PoolAddress.computeAddress(
            uniswapFactory,
            PoolAddress.getPoolKey(token0, token1, fee)
        ));
    }

    function getMintAmount(uint nftId) public view returns (uint){
        (uint96 nonce,
        address operator,
        address token0,
        address token1,
        uint24 fee,
        int24 tickLower,
        int24 tickUpper,
        uint128 liquidity,
        uint256 feeGrowthInside0LastX128,
        uint256 feeGrowthInside1LastX128,
        uint128 tokensOwed0,
        uint128 tokensOwed1) = nftPositionManager.positions(nftId);

        uint valueUSD = priceOracle.quoteUSD(
            getUniswapPool(token0, token1, fee),
            tickLower,
            tickUpper,
            liquidity,
            40,
            40
        );

        return valueUSD * 8 / 10;
    }
}
