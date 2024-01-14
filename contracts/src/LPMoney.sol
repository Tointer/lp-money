// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IGhoToken} from './interfaces/IGhoToken.sol';
import {ILPpriceOracle} from './interfaces/ILPpriceOracle.sol';
import {IGhoFacilitator} from './interfaces/IGhoFacilitator.sol';

import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {PoolAddress} from "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";

import {ERC721Holder} from "@openzeppelin-latest/contracts/token/ERC721/utils/ERC721Holder.sol";
import {IPoolAddressesProvider} from '@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol';
import {IACLManager} from '@aave/core-v3/contracts/interfaces/IACLManager.sol';

contract LPMoney is ERC721Holder, IGhoFacilitator{

    struct PositionInfo{
        address owner;
        uint64 index;
        uint amountMinted; 
    }

    IGhoToken public immutable GHO_TOKEN;
    
    // The Access Control List manager contract
    IACLManager private immutable ACL_MANAGER;

    address private uniswapFactory;
    INonfungiblePositionManager private nftPositionManager;
    ILPpriceOracle private priceOracle;

    // The GHO treasury, the recipient of fee distributions
    address private _ghoTreasury;

    mapping(address owner => uint[]) private _ownedTokens;
    mapping(uint tokenId => PositionInfo) private _ownedTokensIndex;

    /**
   * @dev Only pool admin can call functions marked by this modifier.
   */
    modifier onlyPoolAdmin() {
        require(ACL_MANAGER.isPoolAdmin(msg.sender), 'CALLER_NOT_POOL_ADMIN');
        _;
    }

    constructor(
        address _uniswapFactory, 
        IGhoToken _ghoTokenAddress, 
        INonfungiblePositionManager _nftPositionManager, 
        ILPpriceOracle _lpPriceOracle,
        address addressesProvider
    ) {
        uniswapFactory = _uniswapFactory;
        GHO_TOKEN = _ghoTokenAddress;
        nftPositionManager = _nftPositionManager;
        priceOracle = _lpPriceOracle;
        ACL_MANAGER = IACLManager(IPoolAddressesProvider(addressesProvider).getACLManager());
    }

    function close(uint collateralNftId) public {
        PositionInfo memory positionInfo = _ownedTokensIndex[collateralNftId];
        address owner = positionInfo.owner;
        uint index = positionInfo.index;
        uint amountMinted = positionInfo.amountMinted;
        bool inRange = index < _ownedTokens[msg.sender].length;
        require(owner == msg.sender, "LPMoney: caller is not the owner of the NFT");

        GHO_TOKEN.transferFrom(msg.sender, address(this), amountMinted);
        GHO_TOKEN.burn(amountMinted);

        _ownedTokens[msg.sender][index] = _ownedTokens[msg.sender][_ownedTokens[msg.sender].length - 1];
        _ownedTokens[msg.sender].pop();
        delete _ownedTokensIndex[collateralNftId];

        nftPositionManager.transferFrom(address(this), msg.sender, collateralNftId);
    }

    function liquidate(uint collateralNftId) public {
        uint currentValue = getPositionWorth(collateralNftId);

        PositionInfo memory positionInfo = _ownedTokensIndex[collateralNftId];
        address owner = positionInfo.owner;
        uint index = positionInfo.index;
        uint amountMinted = positionInfo.amountMinted;

        uint liquidateThreshold = amountMinted * 11000 / 10000;

        GHO_TOKEN.transferFrom(msg.sender, address(this), amountMinted);
        GHO_TOKEN.burn(amountMinted);

        require(currentValue <= liquidateThreshold, "LPMoney: healthy position cannot be liquidated");

        _ownedTokens[owner][index] = _ownedTokens[owner][_ownedTokens[owner].length - 1];
        _ownedTokens[owner].pop();
        delete _ownedTokensIndex[collateralNftId];

        nftPositionManager.transferFrom(address(this), msg.sender, collateralNftId);
    }

    function mint(uint collateralNftId) public {
        nftPositionManager.transferFrom(msg.sender, address(this), collateralNftId);
        
        uint amount = getPositionWorth(collateralNftId) * 8000 / 10000;
        _ownedTokens[msg.sender].push(collateralNftId);
        _ownedTokensIndex[collateralNftId] = PositionInfo(msg.sender, uint64(_ownedTokens[msg.sender].length - 1), amount);

        GHO_TOKEN.mint(msg.sender, amount);
    }

    function getUniswapPool(address token0, address token1, uint24 fee) public view returns (IUniswapV3Pool) {
        return IUniswapV3Pool(PoolAddress.computeAddress(
            uniswapFactory,
            PoolAddress.getPoolKey(token0, token1, fee)
        ));
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

    function getPositionWorth(uint nftId) internal view returns (uint){
        (uint96 nonce,
        address operator,
        address token0,
        address token1,
        uint24 fee,
        int24 tickLower,
        int24 tickUpper,
        uint128 liquidity,
        uint256 feeGrowthInside0LastX128,
        uint256 feeGrowthInside1LastX128,
        uint128 tokensOwed0,
        uint128 tokensOwed1) = nftPositionManager.positions(nftId);

        return priceOracle.quoteUSD(
            getUniswapPool(token0, token1, fee),
            tickLower,
            tickUpper,
            liquidity,
            120,
            40
        );
    }

    function _updateGhoTreasury(address newGhoTreasury) internal {
        address oldGhoTreasury = _ghoTreasury;
        _ghoTreasury = newGhoTreasury;
        emit GhoTreasuryUpdated(oldGhoTreasury, newGhoTreasury);
    }         
}
