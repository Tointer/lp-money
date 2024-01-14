// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin-latest/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin-latest/contracts/access/Ownable.sol";
import {INonfungiblePositionManager} from "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

contract LpCollectionMock is ERC721, INonfungiblePositionManager {
    uint256 private _nextTokenId;

    constructor()
        ERC721("MyToken", "MTK")
    {}

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function positions(uint256 tokenId)
        external
        view
        override
        returns (
            uint96 nonce,
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
            uint128 tokensOwed1
        )
    {
        return (
            0, address(0), address(0), address(1), 0, 0, 0, 0, 0, 0, 0, 0
        );
    }

    function mint(MintParams calldata params)
        external
        payable
        override
        returns (
            uint256 tokenId,
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
    ){
        return (0, 0, 0, 0);
    }

    function increaseLiquidity(
        IncreaseLiquidityParams calldata params
    ) external payable override returns (
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
    ){
        return (0, 0, 0);
    }

    function decreaseLiquidity(
        DecreaseLiquidityParams calldata params
    ) external payable override returns (uint256 amount0, uint256 amount1){
        return (0, 0);
    }

    function collect(CollectParams calldata params) external payable override returns (uint256 amount0, uint256 amount1){
        return (0, 0);
    }

    function burn(uint256 tokenId) external payable override{}
    function DOMAIN_SEPARATOR() external view override returns (bytes32){
        return bytes32(0);
    }
    function PERMIT_TYPEHASH() external pure override returns (bytes32){
        return bytes32(0);
    }
    function WETH9() external view override returns (address){
        return address(0);
    }
    function factory() external view override returns (address){
        return address(0);
    }
    function unwrapWETH9(uint256 amountMinimum, address recipient) external payable override{}
    function totalSupply() external view override returns (uint256){
        return 0;
    }
    function tokenOfOwnerByIndex(address owner, uint256 index) external view override returns (uint256){
        return 0;
    }
    function tokenByIndex(uint256 index) external view override returns (uint256){
        return 0;
    }
    function refundETH() external payable override{}
    function sweepToken(
        address token,
        uint256 amountMinimum,
        address recipient
    ) external payable override{}

    function permit(
        address spender,
        uint256 tokenId,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external payable override{}

    function createAndInitializePoolIfNecessary(
        address token0,
        address token1,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external payable returns (address pool){
        return address(0);
    }
}
