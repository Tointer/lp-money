import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LPMoney
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lpMoneyAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_uniswapFactory', internalType: 'address', type: 'address' },
      { name: '_ghoTokenAddress', internalType: 'address', type: 'address' },
      { name: '_nftPositionManager', internalType: 'address', type: 'address' },
      { name: '_lpPriceOracle', internalType: 'address', type: 'address' },
      { name: 'addressesProvider', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'ghoTreasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeesDistributedToTreasury',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldGhoTreasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newGhoTreasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GhoTreasuryUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GHO_TOKEN',
    outputs: [
      { name: '', internalType: 'contract IGhoToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'collateralNftId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'close',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'distributeFeesToTreasury',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeBps',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getAllPositionsOf',
    outputs: [{ name: 'tokenIds', internalType: 'uint64[]', type: 'uint64[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getAllUniswapPositionsOf',
    outputs: [{ name: 'tokenIds', internalType: 'uint64[]', type: 'uint64[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getGhoTreasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getPositionOfOwnerByIndex',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getPositionsBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'getTokenInfo',
    outputs: [
      { name: 'maxLTV', internalType: 'uint32', type: 'uint32' },
      { name: 'liqThreshold', internalType: 'uint32', type: 'uint32' },
      { name: 'oracleAddress', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'collateralNftId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'liquidate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minPositionValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'collateralNftId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'collateralNftId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'previewMint',
    outputs: [{ name: 'mintAmount', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'uint256', type: 'uint256' }],
    name: 'setFeeBps',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinPositionValue',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'maxLTV', internalType: 'uint32', type: 'uint32' },
      { name: 'liqThreshold', internalType: 'uint32', type: 'uint32' },
      { name: 'oracleAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setRiskFactor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newGhoTreasury', internalType: 'address', type: 'address' },
    ],
    name: 'updateGhoTreasury',
    outputs: [],
  },
] as const

export const lpMoneyAddress =
  '0xdAAfC1F3B2C19bc1d3ca5602C4394f82387951B5' as const

export const lpMoneyConfig = {
  address: lpMoneyAddress,
  abi: lpMoneyAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

export const erc20Address =
  '0x75b1f376006E9B031D7E2BE3d58e97B64bcbb2A5' as const

export const erc20Config = { address: erc20Address, abi: erc20Abi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WETH9', internalType: 'address', type: 'address' },
      { name: '_tokenDescriptor_', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Collect',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DecreaseLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IncreaseLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WETH9',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.CollectParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'amount0Max', internalType: 'uint128', type: 'uint128' },
          { name: 'amount1Max', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    name: 'collect',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'createAndInitializePoolIfNecessary',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType:
          'struct INonfungiblePositionManager.DecreaseLiquidityParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'decreaseLiquidity',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType:
          'struct INonfungiblePositionManager.IncreaseLiquidityParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'increaseLiquidity',
    outputs: [
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.MintParams',
        type: 'tuple',
        components: [
          { name: 'token0', internalType: 'address', type: 'address' },
          { name: 'token1', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'amount0Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'mint',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'positions',
    outputs: [
      { name: 'nonce', internalType: 'uint96', type: 'uint96' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      {
        name: 'feeGrowthInside0LastX128',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'tokensOwed0', internalType: 'uint128', type: 'uint128' },
      { name: 'tokensOwed1', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'refundETH',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermit',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowed',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowedIfNecessary',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitIfNecessary',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepToken',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount0Owed', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Owed', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'uniswapV3MintCallback',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWETH9',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

export const erc721Address =
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88' as const

export const erc721Config = { address: erc721Address, abi: erc721Abi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__
 */
export const useReadLpMoney = /*#__PURE__*/ createUseReadContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"GHO_TOKEN"`
 */
export const useReadLpMoneyGhoToken = /*#__PURE__*/ createUseReadContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'GHO_TOKEN',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"feeBps"`
 */
export const useReadLpMoneyFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'feeBps',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"getAllPositionsOf"`
 */
export const useReadLpMoneyGetAllPositionsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'getAllPositionsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"getAllUniswapPositionsOf"`
 */
export const useReadLpMoneyGetAllUniswapPositionsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'getAllUniswapPositionsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"getGhoTreasury"`
 */
export const useReadLpMoneyGetGhoTreasury = /*#__PURE__*/ createUseReadContract(
  { abi: lpMoneyAbi, address: lpMoneyAddress, functionName: 'getGhoTreasury' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"getPositionOfOwnerByIndex"`
 */
export const useReadLpMoneyGetPositionOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'getPositionOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"getPositionsBalance"`
 */
export const useReadLpMoneyGetPositionsBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'getPositionsBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"getTokenInfo"`
 */
export const useReadLpMoneyGetTokenInfo = /*#__PURE__*/ createUseReadContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'getTokenInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"minPositionValue"`
 */
export const useReadLpMoneyMinPositionValue =
  /*#__PURE__*/ createUseReadContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'minPositionValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"previewMint"`
 */
export const useReadLpMoneyPreviewMint = /*#__PURE__*/ createUseReadContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'previewMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__
 */
export const useWriteLpMoney = /*#__PURE__*/ createUseWriteContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"close"`
 */
export const useWriteLpMoneyClose = /*#__PURE__*/ createUseWriteContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'close',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"distributeFeesToTreasury"`
 */
export const useWriteLpMoneyDistributeFeesToTreasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'distributeFeesToTreasury',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"liquidate"`
 */
export const useWriteLpMoneyLiquidate = /*#__PURE__*/ createUseWriteContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'liquidate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteLpMoneyMint = /*#__PURE__*/ createUseWriteContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteLpMoneyOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"setFeeBps"`
 */
export const useWriteLpMoneySetFeeBps = /*#__PURE__*/ createUseWriteContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'setFeeBps',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"setMinPositionValue"`
 */
export const useWriteLpMoneySetMinPositionValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'setMinPositionValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"setRiskFactor"`
 */
export const useWriteLpMoneySetRiskFactor =
  /*#__PURE__*/ createUseWriteContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'setRiskFactor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"updateGhoTreasury"`
 */
export const useWriteLpMoneyUpdateGhoTreasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'updateGhoTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__
 */
export const useSimulateLpMoney = /*#__PURE__*/ createUseSimulateContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"close"`
 */
export const useSimulateLpMoneyClose = /*#__PURE__*/ createUseSimulateContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'close',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"distributeFeesToTreasury"`
 */
export const useSimulateLpMoneyDistributeFeesToTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'distributeFeesToTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"liquidate"`
 */
export const useSimulateLpMoneyLiquidate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'liquidate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateLpMoneyMint = /*#__PURE__*/ createUseSimulateContract({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateLpMoneyOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"setFeeBps"`
 */
export const useSimulateLpMoneySetFeeBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'setFeeBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"setMinPositionValue"`
 */
export const useSimulateLpMoneySetMinPositionValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'setMinPositionValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"setRiskFactor"`
 */
export const useSimulateLpMoneySetRiskFactor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'setRiskFactor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lpMoneyAbi}__ and `functionName` set to `"updateGhoTreasury"`
 */
export const useSimulateLpMoneyUpdateGhoTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    functionName: 'updateGhoTreasury',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lpMoneyAbi}__
 */
export const useWatchLpMoneyEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lpMoneyAbi,
  address: lpMoneyAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lpMoneyAbi}__ and `eventName` set to `"FeesDistributedToTreasury"`
 */
export const useWatchLpMoneyFeesDistributedToTreasuryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    eventName: 'FeesDistributedToTreasury',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lpMoneyAbi}__ and `eventName` set to `"GhoTreasuryUpdated"`
 */
export const useWatchLpMoneyGhoTreasuryUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lpMoneyAbi,
    address: lpMoneyAddress,
    eventName: 'GhoTreasuryUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, address: erc20Address, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    address: erc20Address,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useReadErc721 = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadErc721DomainSeparator = /*#__PURE__*/ createUseReadContract(
  { abi: erc721Abi, address: erc721Address, functionName: 'DOMAIN_SEPARATOR' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadErc721PermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'PERMIT_TYPEHASH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"WETH9"`
 */
export const useReadErc721Weth9 = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'WETH9',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"baseURI"`
 */
export const useReadErc721BaseUri = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'baseURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"factory"`
 */
export const useReadErc721Factory = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadErc721GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadErc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc721Name = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"positions"`
 */
export const useReadErc721Positions = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'positions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc721Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadErc721TokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadErc721TokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadErc721TokenUri = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc721TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useWriteErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"burn"`
 */
export const useWriteErc721Burn = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"collect"`
 */
export const useWriteErc721Collect = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'collect',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`
 */
export const useWriteErc721CreateAndInitializePoolIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'createAndInitializePoolIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const useWriteErc721DecreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const useWriteErc721IncreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteErc721Mint = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"multicall"`
 */
export const useWriteErc721Multicall = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'multicall',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"permit"`
 */
export const useWriteErc721Permit = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"refundETH"`
 */
export const useWriteErc721RefundEth = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'refundETH',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteErc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermit"`
 */
export const useWriteErc721SelfPermit = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'selfPermit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const useWriteErc721SelfPermitAllowed =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const useWriteErc721SelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const useWriteErc721SelfPermitIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteErc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"sweepToken"`
 */
export const useWriteErc721SweepToken = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'sweepToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc721TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"uniswapV3MintCallback"`
 */
export const useWriteErc721UniswapV3MintCallback =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'uniswapV3MintCallback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"unwrapWETH9"`
 */
export const useWriteErc721UnwrapWeth9 = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'unwrapWETH9',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useSimulateErc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721Abi,
  address: erc721Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc721Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc721Abi, address: erc721Address, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"burn"`
 */
export const useSimulateErc721Burn = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"collect"`
 */
export const useSimulateErc721Collect = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc721Abi, address: erc721Address, functionName: 'collect' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`
 */
export const useSimulateErc721CreateAndInitializePoolIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'createAndInitializePoolIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const useSimulateErc721DecreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const useSimulateErc721IncreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateErc721Mint = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateErc721Multicall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"permit"`
 */
export const useSimulateErc721Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721Abi,
  address: erc721Address,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"refundETH"`
 */
export const useSimulateErc721RefundEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'refundETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateErc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermit"`
 */
export const useSimulateErc721SelfPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const useSimulateErc721SelfPermitAllowed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const useSimulateErc721SelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const useSimulateErc721SelfPermitIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateErc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"sweepToken"`
 */
export const useSimulateErc721SweepToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"uniswapV3MintCallback"`
 */
export const useSimulateErc721UniswapV3MintCallback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'uniswapV3MintCallback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"unwrapWETH9"`
 */
export const useSimulateErc721UnwrapWeth9 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    address: erc721Address,
    functionName: 'unwrapWETH9',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__
 */
export const useWatchErc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc721Abi,
  address: erc721Address,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    address: erc721Address,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchErc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    address: erc721Address,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Collect"`
 */
export const useWatchErc721CollectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    address: erc721Address,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"DecreaseLiquidity"`
 */
export const useWatchErc721DecreaseLiquidityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    address: erc721Address,
    eventName: 'DecreaseLiquidity',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"IncreaseLiquidity"`
 */
export const useWatchErc721IncreaseLiquidityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    address: erc721Address,
    eventName: 'IncreaseLiquidity',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    address: erc721Address,
    eventName: 'Transfer',
  })
