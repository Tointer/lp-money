// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IGhoToken} from './interfaces/IGhoToken.sol';
import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {ILPpriceOracle} from './interfaces/ILPpriceOracle.sol';
import {PoolAddress} from "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";

contract LPMoney {
    uint public number;
    address public uniswapFactory;
    INonfungiblePositionManager public nftPositionManager;

    mapping(address owner => mapping(uint index => uint)) private _collateral;
    mapping(uint tokenId => uint) private _positionsCount;
    

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function liquidate() public {
        number++;
    }

    function mint(uint collateralNftId) public {
        nftPositionManager.transferFrom(msg.sender, address(this), nftId);
        IGhoToken(_to).mint(msg.sender, _amount);
    }

    function getUniswapPool(address token0, address token1, uint24 fee) public view returns (address) {
        return PoolAddress.computeAddress(
            uniswapFactory,
            PoolAddress.getPoolKey(token0, token1, fee)
        );
    }

    function getMintAmount(uint nftId){
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

        uint256 token0Base = ERC20(token0).decimals();
        uint256 token1Base = ERC20(token1).decimals();
        uint256 uniV3OracleSecondsAgo = 0;
        uint256 chainlinkPriceMaxAgeSecs = 0;
        address uniswapPool = getUniswapPool(token0, token1, fee);

        uint256 valueUSD = ILPpriceOracle.quoteUSD(
            uniswapPool,
            tickLower,
            tickUpper,
            liquidity,
            uniV3OracleSecondsAgo,
            chainlinkPriceMaxAgeSecs
        );

        return valueUSD * 8 / 10;
    }
}
