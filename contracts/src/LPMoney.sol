// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IGhoToken} from './interfaces/IGhoToken.sol';
import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {ILPpriceOracle} from './interfaces/ILPpriceOracle.sol';
import {PoolAddress} from "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";
import {ERC721Holder} from "@openzeppelin-latest/contracts/token/ERC721/utils/ERC721Holder.sol";

contract LPMoney is ERC721Holder{

    struct PositionInfo{
        address owner;
        uint64 index;
        uint amountMinted; 
    }

    address private ghoTokenAddress;
    address private uniswapFactory;
    INonfungiblePositionManager private nftPositionManager;
    ILPpriceOracle private priceOracle;

    mapping(address owner => uint[]) private _ownedTokens;
    mapping(uint tokenId => PositionInfo) private _ownedTokensIndex;

    constructor(
        address _uniswapFactory, 
        address _ghoTokenAddress, 
        INonfungiblePositionManager _nftPositionManager, 
        ILPpriceOracle _lpPriceOracle
    ) {
        uniswapFactory = _uniswapFactory;
        ghoTokenAddress = _ghoTokenAddress;
        nftPositionManager = _nftPositionManager;
        priceOracle = _lpPriceOracle;
    }

    function close(uint collateralNftId) public {
        PositionInfo memory positionInfo = _ownedTokensIndex[collateralNftId];
        address owner = positionInfo.owner;
        uint index = positionInfo.index;
        uint amountMinted = positionInfo.amountMinted;
        bool inRange = index < _ownedTokens[msg.sender].length;
        require(owner == msg.sender, "LPMoney: caller is not the owner of the NFT");

        IGhoToken(ghoTokenAddress).transferFrom(msg.sender, address(this), amountMinted);
        IGhoToken(ghoTokenAddress).burn(amountMinted);

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

        IGhoToken(ghoTokenAddress).transferFrom(msg.sender, address(this), amountMinted);
        IGhoToken(ghoTokenAddress).burn(amountMinted);

        require(currentValue <= liquidateThreshold, "LPMoney: healthy position cannot be liquidated");

        _ownedTokens[msg.sender][index] = _ownedTokens[msg.sender][_ownedTokens[msg.sender].length - 1];
        _ownedTokens[msg.sender].pop();
        delete _ownedTokensIndex[collateralNftId];

        nftPositionManager.transferFrom(address(this), msg.sender, collateralNftId);
    }

    function mint(uint collateralNftId) public {
        nftPositionManager.transferFrom(msg.sender, address(this), collateralNftId);
        
        uint amount = getPositionWorth(collateralNftId) * 8000 / 10000;
        _ownedTokens[msg.sender].push(collateralNftId);
        _ownedTokensIndex[collateralNftId] = PositionInfo(msg.sender, uint64(_ownedTokens[msg.sender].length - 1), amount);

        IGhoToken(ghoTokenAddress).mint(msg.sender, amount);
    }

    function getUniswapPool(address token0, address token1, uint24 fee) public view returns (IUniswapV3Pool) {
        return IUniswapV3Pool(PoolAddress.computeAddress(
            uniswapFactory,
            PoolAddress.getPoolKey(token0, token1, fee)
        ));
    }

    function getPositionWorth(uint nftId) public view returns (uint){
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
}
