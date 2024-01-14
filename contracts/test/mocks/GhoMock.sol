// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../../src/interfaces/IGhoToken.sol";

contract GhoMock is ERC20, ERC20Burnable, IGhoToken {
    constructor()
        ERC20("MyToken", "MTK")
    {}

    function mint(address to, uint256 amount) public override{
        _mint(to, amount);
    }

    function burn(uint256 value) public override(IGhoToken, ERC20Burnable) {
        _burn(_msgSender(), value);
    }

    function addFacilitator(
      address facilitatorAddress,
      string calldata facilitatorLabel,
      uint128 bucketCapacity
    ) external override {}

    function removeFacilitator(
      address facilitatorAddress
    ) external override {}

    function setFacilitatorBucketCapacity(
      address facilitator, uint128 newCapacity
    ) external override {}

    function getFacilitator(
      address facilitator
    ) external view override returns (Facilitator memory){
        return Facilitator(0, 0, "");
    }

    function getFacilitatorBucket(
      address facilitator
    ) external view override returns (uint256, uint256) {
        return (0, 0);
    }

    function getFacilitatorsList(
    ) external view override returns (address[] memory){
        return new address[](0);
    }

    function BUCKET_MANAGER_ROLE() external pure override returns (bytes32){return bytes32(0);}
    function FACILITATOR_MANAGER_ROLE() external pure override returns (bytes32){return bytes32(0);}
    function getRoleAdmin(bytes32 role) external view override returns (bytes32){return bytes32(0);}
    function grantRole(bytes32 role, address account) external override{}
    function hasRole(bytes32 role, address account) external view override returns (bool){return true;}
    function renounceRole(bytes32 role, address callerConfirmation) external override{}
    function revokeRole(bytes32 role, address account) external override{}
}