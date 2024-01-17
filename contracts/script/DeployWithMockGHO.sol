// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {IGhoToken} from "../src/interfaces/IGhoToken.sol";
import {ILPpriceOracle} from "../src/interfaces/ILPpriceOracle.sol";
import {ACLManagerMock} from "../test/mocks/ACLManagerMock.sol";
import {GhoMock} from "../test/mocks/GhoMock.sol";
import {PoolAddressProviderMock} from "../test/mocks/PoolAddressProviderMock.sol";
import {LPMoney} from "../src/LPMoney.sol";

contract DeployWithMockGHO is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerPublicKey = address(0x0851cf50ba227dFC6baE3BE616eF953D813a3a62);
        address uniswapV3Factory = address(0x1F98431c8aD98523631AE4a59f267346ea31F984);
        address uniswapNFTmanager = address(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);
        address bunniPriceOralce = address(0xEBe234F2A6ba1080f6620Ac340017a4cbB44c41F); 
        

        vm.startBroadcast(deployerPrivateKey);

        GhoMock ghoMock = new GhoMock();
        ACLManagerMock aclManager = new ACLManagerMock();
        PoolAddressProviderMock poolAddressProvider = new PoolAddressProviderMock();

        poolAddressProvider.setACLManger(address(aclManager));
        aclManager.setPoolAdmin(deployerPublicKey);

        LPMoney lpMoney = new LPMoney(
            uniswapV3Factory, 
            address(ghoMock), 
            uniswapNFTmanager, 
            bunniPriceOralce, 
            address(poolAddressProvider)
        );
        

        vm.stopBroadcast();
    }
}
