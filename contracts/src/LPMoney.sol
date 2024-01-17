// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ILPpriceOracle} from './interfaces/ILPpriceOracle.sol';
import {IGhoToken} from './interfaces/IGhoToken.sol';
import {RiskFacilitator} from './RiskFacilitator.sol';

import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {PoolAddress} from "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";

import {ERC721Holder} from "@openzeppelin-latest/contracts/token/ERC721/utils/ERC721Holder.sol";

contract LPMoney is ERC721Holder, RiskFacilitator{

    struct PositionInfo{
        address owner;
        uint64 index;
        uint amountMinted; 
    }

    address private uniswapFactory;
    INonfungiblePositionManager private nftPositionManager;
    ILPpriceOracle private priceOracle;

    mapping(address owner => uint[]) private _ownedTokens;
    mapping(uint tokenId => PositionInfo) private _ownedTokensIndex;

    constructor(
        address _uniswapFactory, 
        IGhoToken _ghoTokenAddress, 
        INonfungiblePositionManager _nftPositionManager, 
        ILPpriceOracle _lpPriceOracle,
        address addressesProvider
    ) RiskFacilitator(_ghoTokenAddress, addressesProvider){
        uniswapFactory = _uniswapFactory;
        nftPositionManager = _nftPositionManager;
        priceOracle = _lpPriceOracle;
    }

    function close(uint collateralNftId) public {
        PositionInfo memory positionInfo = _ownedTokensIndex[collateralNftId];
        address owner = positionInfo.owner;
        uint index = positionInfo.index;
        uint amountMinted = positionInfo.amountMinted;
        require(owner == msg.sender, "LPMoney: caller is not the owner of the NFT");

        GHO_TOKEN.transferFrom(msg.sender, address(this), amountMinted);
        GHO_TOKEN.burn(amountMinted);

        uint length = _ownedTokens[owner].length;
        if(length == index + 1){
            _ownedTokens[owner].pop();
        }else{
            _ownedTokens[owner][index] = _ownedTokens[owner][_ownedTokens[owner].length - 1];
            _ownedTokens[owner].pop();
            _ownedTokensIndex[_ownedTokens[owner][index]].index = uint64(index);
        }

        delete _ownedTokensIndex[collateralNftId];

        nftPositionManager.transferFrom(address(this), msg.sender, collateralNftId);
    }

    function liquidate(uint collateralNftId) public {
        (uint amount, uint32 maxLTV, uint32 liqudationThreshold) = getPositionWorth(collateralNftId);

        PositionInfo memory positionInfo = _ownedTokensIndex[collateralNftId];
        address owner = positionInfo.owner;
        uint index = positionInfo.index;
        uint amountMinted = positionInfo.amountMinted;

        uint liquidateThreshold = amountMinted + amountMinted * liqudationThreshold / 10000;

        GHO_TOKEN.transferFrom(msg.sender, address(this), amountMinted);
        GHO_TOKEN.burn(amountMinted);

        require(amount <= liquidateThreshold, "LPMoney: healthy position cannot be liquidated");

        uint length = _ownedTokens[owner].length;
        if(length == index + 1){
            _ownedTokens[owner].pop();
        }else{
            _ownedTokens[owner][index] = _ownedTokens[owner][_ownedTokens[owner].length - 1];
            _ownedTokens[owner].pop();
            _ownedTokensIndex[_ownedTokens[owner][index]].index = uint64(index);
        }

        delete _ownedTokensIndex[collateralNftId];

        nftPositionManager.transferFrom(address(this), msg.sender, collateralNftId);
    }

    function mint(uint collateralNftId) public {
        nftPositionManager.transferFrom(msg.sender, address(this), collateralNftId);
        (uint amount, uint32 maxLTV, uint32 liqudationThreshold) = getPositionWorth(collateralNftId);

        uint mintAmount = amount * maxLTV / 10000;

        _ownedTokens[msg.sender].push(collateralNftId);
        _ownedTokensIndex[collateralNftId] = PositionInfo(msg.sender, uint64(_ownedTokens[msg.sender].length - 1), mintAmount);

        GHO_TOKEN.mint(msg.sender, mintAmount);
    }

    function previewMint(uint collateralNftId) public view returns (uint mintAmount) {
        (uint amount, uint32 maxLTV, uint32 liqudationThreshold) = getPositionWorth(collateralNftId);

        mintAmount = amount * maxLTV / 10000;
    }

    function getPositionsBalance(address owner) public view returns (uint balance) {
        balance = _ownedTokens[owner].length;
    }

    function getPositionOfOwnerByIndex(address owner, uint index) public view returns (uint tokenId) {
        tokenId = _ownedTokens[owner][index];
    }

    function getUniswapPool(address token0, address token1, uint24 fee) public view returns (IUniswapV3Pool) {
        return IUniswapV3Pool(PoolAddress.computeAddress(
            uniswapFactory,
            PoolAddress.getPoolKey(token0, token1, fee)
        ));
    }

    function getPositionWorth(uint nftId) internal view returns (uint amount, uint32 maxLTV, uint32 liqudationThreshold){
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

        amount =  priceOracle.quoteUSD(
            getUniswapPool(token0, token1, fee),
            tickLower,
            tickUpper,
            liquidity,
            120,
            40
        );

        (maxLTV, liqudationThreshold) = getWorstRisk(token0, token1);
    }   
}
