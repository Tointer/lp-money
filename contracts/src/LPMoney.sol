// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract LPMoney {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function liquidate() public {
        number++;
    }
}
