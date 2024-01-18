// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract UniswapFactoryMock {

    address public result;

    function getPool(
        address tokenA, 
        address tokenB, 
        uint24 fee
    ) external view returns (address pool){
        return result;
    }

    function setPool(address _result) external {
        result = _result;
    }
}
