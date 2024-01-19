// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IGhoToken} from './interfaces/IGhoToken.sol';
import {IGhoFacilitator} from './interfaces/IGhoFacilitator.sol';
import {IPoolAddressesProvider} from '@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol';
import {IACLManager} from '@aave/core-v3/contracts/interfaces/IACLManager.sol';

contract RiskFacilitator is IGhoFacilitator{

    struct RiskFactor {
        uint32 maxLTV;
        uint32 liqThreshold;
        address oracleAddress;
    }

    IGhoToken public immutable GHO_TOKEN;
    IACLManager private immutable ACL_MANAGER;
    uint public minPositionValue;
    uint public feeBps;

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
        address _ghoTokenAddress, 
        address addressesProvider
    ) {
        GHO_TOKEN = IGhoToken(_ghoTokenAddress);
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

    function setMinPositionValue(uint newValue) external onlyPoolAdmin {
        minPositionValue = newValue;
    }

    function setFeeBps(uint newValue) external onlyPoolAdmin {
        feeBps = newValue;
    }

    /// @inheritdoc IGhoFacilitator
    function getGhoTreasury() external view override returns (address) {
        return _ghoTreasury;
    }

    function setRiskFactor(address token, uint32 maxLTV, uint32 liqThreshold, address oracleAddress) external onlyPoolAdmin {
        require(maxLTV > 0, "RiskFacilitator: maxLTV must be greater than 0");
        require(liqThreshold > 0, "RiskFacilitator: liqThreshold must be greater than 0");
        riskFactors[token] = RiskFactor(maxLTV, liqThreshold, oracleAddress);
    }

    function getTokenInfo(address token) public view returns (uint32 maxLTV, uint32 liqThreshold, address oracleAddress) {
        RiskFactor memory risk = riskFactors[token];
        return (risk.maxLTV, risk.liqThreshold, risk.oracleAddress);      
    }

    function getWorstRisk(address token0, address token1) internal view returns (uint32 maxLTV, uint32 liqThreshold, address token0Oracle, address token1Oracle) {
        RiskFactor memory risk0 = riskFactors[token0];
        RiskFactor memory risk1 = riskFactors[token1];
        if (risk0.maxLTV > risk1.maxLTV) {
            return (risk1.maxLTV, risk1.liqThreshold, risk0.oracleAddress, risk1.oracleAddress);
        } else {
            return (risk0.maxLTV, risk0.liqThreshold, risk0.oracleAddress, risk1.oracleAddress);
        }
    }

    function _updateGhoTreasury(address newGhoTreasury) internal {
        address oldGhoTreasury = _ghoTreasury;
        _ghoTreasury = newGhoTreasury;
        emit GhoTreasuryUpdated(oldGhoTreasury, newGhoTreasury);
    }      
}