// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ILPpriceOracle {
    function getLatestPrice(address firstToken, address secondToken) external view returns (uint256);
}
