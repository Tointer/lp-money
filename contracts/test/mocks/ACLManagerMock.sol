// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract ACLManagerMock {

    address public poolAdmin;

    function setPoolAdmin(address _poolAdmin) external {
        poolAdmin = _poolAdmin;
    }
    
    function isPoolAdmin(address admin) external view returns (bool) {
        return admin == poolAdmin;
    }
}
