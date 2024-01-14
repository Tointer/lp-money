// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {ILPpriceOracle} from '../../src/interfaces/ILPpriceOracle.sol';
import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

contract PriceOracleMock is ILPpriceOracle{
    uint256 public currentMockPrice;

    function quoteUSD(
        IUniswapV3Pool pool,
        int24 tickLower,
        int24 tickUpper,
        uint128 liquidity,
        uint32 uniV3OracleSecondsAgo,
        uint256 chainlinkPriceMaxAgeSecs
    ) external override view returns (uint256 valueUSD){
        return currentMockPrice;
    }

    function setMockedPrice(uint256 x) public {
        currentMockPrice = x;
    }
}
