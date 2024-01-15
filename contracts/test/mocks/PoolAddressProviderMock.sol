// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract PoolAddressProviderMock {

    address public aclManager;

    function setACLManger(address _aclManager) external {
        aclManager = _aclManager;
    }
    
    function getACLManager() external view returns (address) {
        return aclManager;
    }
}
