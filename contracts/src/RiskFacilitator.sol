// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IGhoToken} from './interfaces/IGhoToken.sol';
import {IGhoFacilitator} from './interfaces/IGhoFacilitator.sol';
import {IPoolAddressesProvider} from '@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol';
import {IACLManager} from '@aave/core-v3/contracts/interfaces/IACLManager.sol';

contract RiskFacilitator is IGhoFacilitator{

    struct RiskFactor {
        uint32 maxLTV;
        uint32 liqThreshold;
    }

    IGhoToken public immutable GHO_TOKEN;
    IACLManager private immutable ACL_MANAGER;

    // The GHO treasury, the recipient of fee distributions
    address private _ghoTreasury;

    mapping (address => RiskFactor) private riskFactors;

    /**
    * @dev Only pool admin can call functions marked by this modifier.
    */
    modifier onlyPoolAdmin() {
        require(ACL_MANAGER.isPoolAdmin(msg.sender), 'CALLER_NOT_POOL_ADMIN');
        _;
    }

    constructor(
        IGhoToken _ghoTokenAddress, 
        address addressesProvider
    ) {
        GHO_TOKEN = _ghoTokenAddress;
        ACL_MANAGER = IACLManager(IPoolAddressesProvider(addressesProvider).getACLManager());
    }

    /// @inheritdoc IGhoFacilitator
    function distributeFeesToTreasury() external override {
        uint256 balance = GHO_TOKEN.balanceOf(address(this));
        GHO_TOKEN.transfer(_ghoTreasury, balance);
        emit FeesDistributedToTreasury(_ghoTreasury, address(GHO_TOKEN), balance);
    }

    /// @inheritdoc IGhoFacilitator
    function updateGhoTreasury(address newGhoTreasury) external override onlyPoolAdmin {
        _updateGhoTreasury(newGhoTreasury);
    }

    /// @inheritdoc IGhoFacilitator
    function getGhoTreasury() external view override returns (address) {
        return _ghoTreasury;
    }

    function setRiskFactor(address token, uint32 maxLTV, uint32 liqThreshold) external onlyPoolAdmin {
        require(maxLTV > 0, "RiskFacilitator: maxLTV must be greater than 0");
        require(liqThreshold > 0, "RiskFacilitator: liqThreshold must be greater than 0");
        riskFactors[token] = RiskFactor(maxLTV, liqThreshold);
    }

    function getRisk(address token) public view returns (uint32 maxLTV, uint32 liqThreshold) {
        RiskFactor memory risk = riskFactors[token];
        return (risk.maxLTV, risk.liqThreshold);      
    }

    function getWorstRisk(address token0, address token1) internal view returns (uint32 maxLTV, uint32 liqThreshold) {
        RiskFactor memory risk0 = riskFactors[token0];
        RiskFactor memory risk1 = riskFactors[token1];
        if (risk0.maxLTV > risk1.maxLTV) {
            return (risk1.maxLTV, risk1.liqThreshold);
        } else {
            return (risk0.maxLTV, risk0.liqThreshold);
        }
    }

    function _updateGhoTreasury(address newGhoTreasury) internal {
        address oldGhoTreasury = _ghoTreasury;
        _ghoTreasury = newGhoTreasury;
        emit GhoTreasuryUpdated(oldGhoTreasury, newGhoTreasury);
    }      
}