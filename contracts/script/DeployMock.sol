// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {IGhoToken} from "../src/interfaces/IGhoToken.sol";
import {ILPpriceOracle} from "../src/interfaces/ILPpriceOracle.sol";
import {ACLManagerMock} from "../test/mocks/ACLManagerMock.sol";
import {GhoMock} from "../test/mocks/GhoMock.sol";
import {PoolAddressProviderMock} from "../test/mocks/PoolAddressProviderMock.sol";
import {LPMoney} from "../src/LPMoney.sol";

contract DeployMock is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        //arbi addresses
        address deployerPublicKey = address(0x0851cf50ba227dFC6baE3BE616eF953D813a3a62);
        address uniswapV3Factory = address(0x1F98431c8aD98523631AE4a59f267346ea31F984);
        address uniswapNFTmanager = address(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);
        address bunniPriceOralce = address(0xEBe234F2A6ba1080f6620Ac340017a4cbB44c41F); 
        address ghoMockAddress = address(0x75b1f376006E9B031D7E2BE3d58e97B64bcbb2A5);
        address aclManagerMockAddress = address(0x9E462D6442144d0bd3b8956A5eB68cDa9085F238);
        address poolAddressProviderMockAddress = address(0x1f477a1C4608a8f22C2750af7f3C9C91E8533441);

        address USDCaddress = address(0xaf88d065e77c8cC2239327C5EDb3A432268e5831);
        address USDCaddressBridged = address(0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8);
        address USDTaddress = address(0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9);
        address USDCoracle = address(0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3);
        address USDToracle = address(0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7);

        vm.startBroadcast(deployerPrivateKey);

        //GhoMock ghoMock = new GhoMock();
        // ACLManagerMock aclManager = new ACLManagerMock();
        // PoolAddressProviderMock poolAddressProvider = new PoolAddressProviderMock();

        // poolAddressProvider.setACLManger(address(aclManager)) ;
        // aclManager.setPoolAdmin(deployerPublicKey);

        LPMoney lpMoney = new LPMoney(
            uniswapV3Factory, 
            ghoMockAddress, 
            uniswapNFTmanager, 
            bunniPriceOralce, 
            poolAddressProviderMockAddress
        );

        lpMoney.setRiskFactor(USDCaddress, 8000, 1000, USDCoracle);
        lpMoney.setRiskFactor(USDCaddressBridged, 8000, 1000, USDCoracle);
        lpMoney.setRiskFactor(USDTaddress, 8000, 1000, USDToracle);

        console2.log("estimated: ", lpMoney.previewMint(1074348));
        
        vm.stopBroadcast();

    }
}
