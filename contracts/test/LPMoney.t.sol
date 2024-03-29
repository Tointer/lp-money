// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {Test, console2} from "forge-std/Test.sol";
import {LPMoney} from "../src/LPMoney.sol";
import {IGhoToken} from '../src/interfaces/IGhoToken.sol';

import {GhoMock} from "./mocks/GhoMock.sol";
import {LpCollectionMock} from "./mocks/LpCollectionMock.sol";
import {PriceOracleMock} from "./mocks/PriceOracleMock.sol";
import {ACLManagerMock} from "./mocks/ACLManagerMock.sol";
import {PoolAddressProviderMock} from "./mocks/PoolAddressProviderMock.sol";
import {UniswapFactoryMock} from "./mocks/UniswapFactoryMock.sol";

contract LPMoneyTest is Test {
    IGhoToken public ghoToken;
    LpCollectionMock public lpCollection;
    PriceOracleMock public priceOracle;
    ACLManagerMock public aclManager;
    PoolAddressProviderMock public poolAddressProvider;
    UniswapFactoryMock public uniswapFactory;
    LPMoney public lpMoney;

    address poolAdmin = address(0xa);
    

    function setUp() public {
        ghoToken = new GhoMock();
        lpCollection = new LpCollectionMock(); 
        priceOracle = new PriceOracleMock();
        aclManager = new ACLManagerMock();
        poolAddressProvider = new PoolAddressProviderMock();
        uniswapFactory = new UniswapFactoryMock();

        poolAddressProvider.setACLManger(address(aclManager));
        aclManager.setPoolAdmin(poolAdmin);

        lpMoney = new LPMoney(
            address(uniswapFactory), 
            address(ghoToken), 
            address(lpCollection), 
            address(priceOracle), 
            address(poolAddressProvider)
        );

        vm.startPrank(poolAdmin);
        lpMoney.setRiskFactor(lpCollection.mockToken0(), 8000, 1000, address(0x0));
        lpMoney.setRiskFactor(lpCollection.mockToken1(), 8000, 1000, address(0x0));
        vm.stopPrank();
    }

    function test_mint() public {
        vm.startPrank(address(0x1));
        lpCollection.safeMint(address(0x1));
        lpCollection.setApprovalForAll(address(lpMoney), true);

        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);

        assertEq(ghoToken.balanceOf(address(0x1)), 800);
        assertEq(lpCollection.ownerOf(0), address(lpMoney));
        assertEq(lpMoney.getPositionOfOwnerByIndex(address(0x1), 0), 0);
        assertEq(lpMoney.getPositionsBalance(address(0x1)), 1);
    }

    function test_mint_two() public {
        address user = address(0x1);
        vm.startPrank(user);
        lpCollection.safeMint(user);
        lpCollection.safeMint(user);
        lpCollection.safeMint(user);
        lpCollection.setApprovalForAll(address(lpMoney), true);

        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);
        lpMoney.mint(2);

        assertEq(ghoToken.balanceOf(user), 1600);
        assertEq(lpCollection.ownerOf(0), address(lpMoney));
        assertEq(lpCollection.ownerOf(1), address(user));
        assertEq(lpCollection.ownerOf(2), address(lpMoney));
        assertEq(lpMoney.getPositionOfOwnerByIndex(user, 0), 0);
        assertEq(lpMoney.getPositionOfOwnerByIndex(user, 1), 2);
        assertEq(lpMoney.getPositionsBalance(user), 2);
    }

    function test_getAllPositionsOf() public {
        address user = address(0x1);
        vm.startPrank(user);
        lpCollection.safeMint(user);
        lpCollection.safeMint(user);
        lpCollection.safeMint(user);
        lpCollection.setApprovalForAll(address(lpMoney), true);

        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);
        lpMoney.mint(2);

        uint64[] memory tokenIds = lpMoney.getAllPositionsOf(user);
        assertEq(tokenIds.length, 2);
        assertEq(tokenIds[0], 0);
        assertEq(tokenIds[1], 2);
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
        assertEq(lpMoney.getPositionsBalance(address(0x1)), 0);
    }

    function testFail_closeByNotOwner() public {
        vm.startPrank(address(0x1));
        lpCollection.safeMint(address(0x1));
        lpCollection.setApprovalForAll(address(lpMoney), true);
        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);

        vm.startPrank(address(0x2));
        ghoToken.mint(address(0x2), 800);
        ghoToken.approve(address(lpMoney), 800);
        lpMoney.close(0);

        assertEq(ghoToken.balanceOf(address(0x1)), 0);
        assertEq(lpCollection.ownerOf(0), address(0x1));
    }

    function test_liquidation() public {
        vm.startPrank(address(0x1));
        lpCollection.safeMint(address(0x1));
        lpCollection.setApprovalForAll(address(lpMoney), true);
        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);

        vm.startPrank(address(0x2));
        ghoToken.mint(address(0x2), 800);
        ghoToken.approve(address(lpMoney), 800);
        priceOracle.setMockedPrice(850);
        lpMoney.liquidate(0);

        assertEq(ghoToken.balanceOf(address(0x2)), 0);
        assertEq(lpCollection.ownerOf(0), address(0x2));
        assertEq(lpMoney.getPositionsBalance(address(0x1)), 0);
    }

    function testFail_liquidationAboveThreshold() public {
        vm.startPrank(address(0x1));
        lpCollection.safeMint(address(0x1));
        lpCollection.setApprovalForAll(address(lpMoney), true);
        priceOracle.setMockedPrice(1000);
        lpMoney.mint(0);

        vm.startPrank(address(0x2));
        ghoToken.mint(address(0x2), 800);
        ghoToken.approve(address(lpMoney), 800);
        lpMoney.liquidate(0);
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     // counter.setNumber(x);
    //     // assertEq(counter.number(), x);
    // }
}
