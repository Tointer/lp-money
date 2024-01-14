// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILPpriceOracle {
        function quoteUSD(
        IUniswapV3Pool pool,
        address token0,
        address token1,
        uint256 token0Base,
        uint256 token1Base,
        int24 tickLower,
        int24 tickUpper,
        uint128 liquidity,
        uint32 uniV3OracleSecondsAgo,
        uint256 chainlinkPriceMaxAgeSecs,
        AggregatorV2V3Interface feed0,
        AggregatorV2V3Interface feed1
    ) external view returns (uint256 valueUSD);
}
