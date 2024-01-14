// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {Test, console2} from "forge-std/Test.sol";
import {LPMoney} from "../src/LPMoney.sol";
import {IGhoToken} from '../src/interfaces/IGhoToken.sol';

import {GhoMock} from "./mocks/GhoMock.sol";
import {LpCollectionMock} from "./mocks/LpCollectionMock.sol";
import {PriceOracleMock} from "./mocks/PriceOracleMock.sol";

contract LPMoneyTest is Test {
    IGhoToken public ghoToken;
    LpCollectionMock public lpCollection;
    PriceOracleMock public priceOracle;
    LPMoney public lpMoney;

    function setUp() public {
        ghoToken = new GhoMock();
        lpCollection = new LpCollectionMock(); 
        priceOracle = new PriceOracleMock();
        lpMoney = new LPMoney(address(0), address(ghoToken), INonfungiblePositionManager(lpCollection), priceOracle);
    }

    function test_mint() public {
        vm.startPrank(address(0x1));
        lpCollection.safeMint(address(0x1));
        lpCollection.setApprovalForAll(address(lpMoney), true);

        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);

        assertEq(ghoToken.balanceOf(address(0x1)), 800);
        assertEq(lpCollection.ownerOf(0), address(lpMoney));
    }

    function test_close() public {
        vm.startPrank(address(0x1));
        lpCollection.safeMint(address(0x1));
        lpCollection.setApprovalForAll(address(lpMoney), true);
        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);

        ghoToken.approve(address(lpMoney), 800);
        lpMoney.close(0);

        assertEq(ghoToken.balanceOf(address(0x1)), 0);
        assertEq(lpCollection.ownerOf(0), address(0x1));
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     // counter.setNumber(x);
    //     // assertEq(counter.number(), x);
    // }
}
