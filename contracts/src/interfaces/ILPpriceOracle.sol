// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import {AggregatorV2V3Interface} from "bunni-oracle/external/AggregatorV2V3Interface.sol";

interface ILPpriceOracle {
    function quoteUSD(
        IUniswapV3Pool pool,
        int24 tickLower,
        int24 tickUpper,
        uint128 liquidity,
        uint32 uniV3OracleSecondsAgo,
        uint256 chainlinkPriceMaxAgeSecs,
        AggregatorV2V3Interface feed0,
        AggregatorV2V3Interface feed1
    ) external view returns (uint256 valueUSD);
}
