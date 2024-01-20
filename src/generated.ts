import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LPMoney
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lpMoneyABI = [
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
  abi: lpMoneyABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
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
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'facilitatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'label',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'bucketCapacity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FacilitatorAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'facilitatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'oldCapacity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newCapacity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FacilitatorBucketCapacityUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'facilitatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'oldLevel',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newLevel',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FacilitatorBucketLevelUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'facilitatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'FacilitatorRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'BUCKET_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'FACILITATOR_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'facilitatorAddress', internalType: 'address', type: 'address' },
      { name: 'facilitatorLabel', internalType: 'string', type: 'string' },
      { name: 'bucketCapacity', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'addFacilitator',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'facilitator', internalType: 'address', type: 'address' }],
    name: 'getFacilitator',
    outputs: [
      {
        name: '',
        internalType: 'struct IGhoToken.Facilitator',
        type: 'tuple',
        components: [
          { name: 'bucketCapacity', internalType: 'uint128', type: 'uint128' },
          { name: 'bucketLevel', internalType: 'uint128', type: 'uint128' },
          { name: 'label', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'facilitator', internalType: 'address', type: 'address' }],
    name: 'getFacilitatorBucket',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getFacilitatorsList',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'facilitatorAddress', internalType: 'address', type: 'address' },
    ],
    name: 'removeFacilitator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'facilitator', internalType: 'address', type: 'address' },
      { name: 'newCapacity', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setFacilitatorBucketCapacity',
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
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

export const erc20Address =
  '0x75b1f376006E9B031D7E2BE3d58e97B64bcbb2A5' as const

export const erc20Config = { address: erc20Address, abi: erc20ABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
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

export const erc721Config = { address: erc721Address, abi: erc721ABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__.
 */
export function useLpMoneyRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"GHO_TOKEN"`.
 */
export function useLpMoneyGhoToken<
  TFunctionName extends 'GHO_TOKEN',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'GHO_TOKEN',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"feeBps"`.
 */
export function useLpMoneyFeeBps<
  TFunctionName extends 'feeBps',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'feeBps',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"getAllPositionsOf"`.
 */
export function useLpMoneyGetAllPositionsOf<
  TFunctionName extends 'getAllPositionsOf',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'getAllPositionsOf',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"getAllUniswapPositionsOf"`.
 */
export function useLpMoneyGetAllUniswapPositionsOf<
  TFunctionName extends 'getAllUniswapPositionsOf',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'getAllUniswapPositionsOf',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"getGhoTreasury"`.
 */
export function useLpMoneyGetGhoTreasury<
  TFunctionName extends 'getGhoTreasury',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'getGhoTreasury',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"getPositionOfOwnerByIndex"`.
 */
export function useLpMoneyGetPositionOfOwnerByIndex<
  TFunctionName extends 'getPositionOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'getPositionOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"getPositionsBalance"`.
 */
export function useLpMoneyGetPositionsBalance<
  TFunctionName extends 'getPositionsBalance',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'getPositionsBalance',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"getTokenInfo"`.
 */
export function useLpMoneyGetTokenInfo<
  TFunctionName extends 'getTokenInfo',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'getTokenInfo',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"minPositionValue"`.
 */
export function useLpMoneyMinPositionValue<
  TFunctionName extends 'minPositionValue',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'minPositionValue',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"previewMint"`.
 */
export function useLpMoneyPreviewMint<
  TFunctionName extends 'previewMint',
  TSelectData = ReadContractResult<typeof lpMoneyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'previewMint',
    ...config,
  } as UseContractReadConfig<typeof lpMoneyABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__.
 */
export function useLpMoneyWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lpMoneyABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof lpMoneyABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, TFunctionName, TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"close"`.
 */
export function useLpMoneyClose<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'close'
        >['request']['abi'],
        'close',
        TMode
      > & { functionName?: 'close' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'close', TMode> & {
        abi?: never
        functionName?: 'close'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'close', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'close',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"distributeFeesToTreasury"`.
 */
export function useLpMoneyDistributeFeesToTreasury<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'distributeFeesToTreasury'
        >['request']['abi'],
        'distributeFeesToTreasury',
        TMode
      > & { functionName?: 'distributeFeesToTreasury' }
    : UseContractWriteConfig<
        typeof lpMoneyABI,
        'distributeFeesToTreasury',
        TMode
      > & {
        abi?: never
        functionName?: 'distributeFeesToTreasury'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'distributeFeesToTreasury', TMode>(
    {
      abi: lpMoneyABI,
      address: lpMoneyAddress,
      functionName: 'distributeFeesToTreasury',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"liquidate"`.
 */
export function useLpMoneyLiquidate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'liquidate'
        >['request']['abi'],
        'liquidate',
        TMode
      > & { functionName?: 'liquidate' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'liquidate', TMode> & {
        abi?: never
        functionName?: 'liquidate'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'liquidate', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'liquidate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"mint"`.
 */
export function useLpMoneyMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lpMoneyABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'mint', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useLpMoneyOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'onERC721Received', TMode> & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'onERC721Received', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"setFeeBps"`.
 */
export function useLpMoneySetFeeBps<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'setFeeBps'
        >['request']['abi'],
        'setFeeBps',
        TMode
      > & { functionName?: 'setFeeBps' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'setFeeBps', TMode> & {
        abi?: never
        functionName?: 'setFeeBps'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'setFeeBps', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'setFeeBps',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"setMinPositionValue"`.
 */
export function useLpMoneySetMinPositionValue<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'setMinPositionValue'
        >['request']['abi'],
        'setMinPositionValue',
        TMode
      > & { functionName?: 'setMinPositionValue' }
    : UseContractWriteConfig<
        typeof lpMoneyABI,
        'setMinPositionValue',
        TMode
      > & {
        abi?: never
        functionName?: 'setMinPositionValue'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'setMinPositionValue', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'setMinPositionValue',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"setRiskFactor"`.
 */
export function useLpMoneySetRiskFactor<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'setRiskFactor'
        >['request']['abi'],
        'setRiskFactor',
        TMode
      > & { functionName?: 'setRiskFactor' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'setRiskFactor', TMode> & {
        abi?: never
        functionName?: 'setRiskFactor'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'setRiskFactor', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'setRiskFactor',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"updateGhoTreasury"`.
 */
export function useLpMoneyUpdateGhoTreasury<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpMoneyABI,
          'updateGhoTreasury'
        >['request']['abi'],
        'updateGhoTreasury',
        TMode
      > & { functionName?: 'updateGhoTreasury' }
    : UseContractWriteConfig<typeof lpMoneyABI, 'updateGhoTreasury', TMode> & {
        abi?: never
        functionName?: 'updateGhoTreasury'
      } = {} as any,
) {
  return useContractWrite<typeof lpMoneyABI, 'updateGhoTreasury', TMode>({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'updateGhoTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__.
 */
export function usePrepareLpMoneyWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"close"`.
 */
export function usePrepareLpMoneyClose(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'close'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'close',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'close'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"distributeFeesToTreasury"`.
 */
export function usePrepareLpMoneyDistributeFeesToTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof lpMoneyABI,
      'distributeFeesToTreasury'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'distributeFeesToTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof lpMoneyABI,
    'distributeFeesToTreasury'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"liquidate"`.
 */
export function usePrepareLpMoneyLiquidate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'liquidate'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'liquidate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'liquidate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareLpMoneyMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareLpMoneyOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'onERC721Received'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'onERC721Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"setFeeBps"`.
 */
export function usePrepareLpMoneySetFeeBps(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'setFeeBps'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'setFeeBps',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'setFeeBps'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"setMinPositionValue"`.
 */
export function usePrepareLpMoneySetMinPositionValue(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'setMinPositionValue'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'setMinPositionValue',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'setMinPositionValue'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"setRiskFactor"`.
 */
export function usePrepareLpMoneySetRiskFactor(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'setRiskFactor'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'setRiskFactor',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'setRiskFactor'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpMoneyABI}__ and `functionName` set to `"updateGhoTreasury"`.
 */
export function usePrepareLpMoneyUpdateGhoTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpMoneyABI, 'updateGhoTreasury'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    functionName: 'updateGhoTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpMoneyABI, 'updateGhoTreasury'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpMoneyABI}__.
 */
export function useLpMoneyEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof lpMoneyABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    ...config,
  } as UseContractEventConfig<typeof lpMoneyABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpMoneyABI}__ and `eventName` set to `"FeesDistributedToTreasury"`.
 */
export function useLpMoneyFeesDistributedToTreasuryEvent(
  config: Omit<
    UseContractEventConfig<typeof lpMoneyABI, 'FeesDistributedToTreasury'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    eventName: 'FeesDistributedToTreasury',
    ...config,
  } as UseContractEventConfig<typeof lpMoneyABI, 'FeesDistributedToTreasury'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpMoneyABI}__ and `eventName` set to `"GhoTreasuryUpdated"`.
 */
export function useLpMoneyGhoTreasuryUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpMoneyABI, 'GhoTreasuryUpdated'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpMoneyABI,
    address: lpMoneyAddress,
    eventName: 'GhoTreasuryUpdated',
    ...config,
  } as UseContractEventConfig<typeof lpMoneyABI, 'GhoTreasuryUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"BUCKET_MANAGER_ROLE"`.
 */
export function useErc20BucketManagerRole<
  TFunctionName extends 'BUCKET_MANAGER_ROLE',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'BUCKET_MANAGER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"FACILITATOR_MANAGER_ROLE"`.
 */
export function useErc20FacilitatorManagerRole<
  TFunctionName extends 'FACILITATOR_MANAGER_ROLE',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'FACILITATOR_MANAGER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"getFacilitator"`.
 */
export function useErc20GetFacilitator<
  TFunctionName extends 'getFacilitator',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'getFacilitator',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"getFacilitatorBucket"`.
 */
export function useErc20GetFacilitatorBucket<
  TFunctionName extends 'getFacilitatorBucket',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'getFacilitatorBucket',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"getFacilitatorsList"`.
 */
export function useErc20GetFacilitatorsList<
  TFunctionName extends 'getFacilitatorsList',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'getFacilitatorsList',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useErc20GetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"hasRole"`.
 */
export function useErc20HasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    address: erc20Address,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"addFacilitator"`.
 */
export function useErc20AddFacilitator<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'addFacilitator'
        >['request']['abi'],
        'addFacilitator',
        TMode
      > & { functionName?: 'addFacilitator' }
    : UseContractWriteConfig<typeof erc20ABI, 'addFacilitator', TMode> & {
        abi?: never
        functionName?: 'addFacilitator'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'addFacilitator', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'addFacilitator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"burn"`.
 */
export function useErc20Burn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof erc20ABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'burn', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"burnFrom"`.
 */
export function useErc20BurnFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'burnFrom', TMode> & {
        abi?: never
        functionName?: 'burnFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'burnFrom', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'burnFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"grantRole"`.
 */
export function useErc20GrantRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof erc20ABI, 'grantRole', TMode> & {
        abi?: never
        functionName?: 'grantRole'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'grantRole', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'grantRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"mint"`.
 */
export function useErc20Mint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof erc20ABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'mint', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"removeFacilitator"`.
 */
export function useErc20RemoveFacilitator<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'removeFacilitator'
        >['request']['abi'],
        'removeFacilitator',
        TMode
      > & { functionName?: 'removeFacilitator' }
    : UseContractWriteConfig<typeof erc20ABI, 'removeFacilitator', TMode> & {
        abi?: never
        functionName?: 'removeFacilitator'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'removeFacilitator', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'removeFacilitator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useErc20RenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof erc20ABI, 'renounceRole', TMode> & {
        abi?: never
        functionName?: 'renounceRole'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'renounceRole', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'renounceRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useErc20RevokeRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof erc20ABI, 'revokeRole', TMode> & {
        abi?: never
        functionName?: 'revokeRole'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'revokeRole', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'revokeRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"setFacilitatorBucketCapacity"`.
 */
export function useErc20SetFacilitatorBucketCapacity<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'setFacilitatorBucketCapacity'
        >['request']['abi'],
        'setFacilitatorBucketCapacity',
        TMode
      > & { functionName?: 'setFacilitatorBucketCapacity' }
    : UseContractWriteConfig<
        typeof erc20ABI,
        'setFacilitatorBucketCapacity',
        TMode
      > & {
        abi?: never
        functionName?: 'setFacilitatorBucketCapacity'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc20ABI,
    'setFacilitatorBucketCapacity',
    TMode
  >({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'setFacilitatorBucketCapacity',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"addFacilitator"`.
 */
export function usePrepareErc20AddFacilitator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'addFacilitator'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'addFacilitator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'addFacilitator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareErc20Burn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"burnFrom"`.
 */
export function usePrepareErc20BurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'burnFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareErc20GrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'grantRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'grantRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareErc20Mint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"removeFacilitator"`.
 */
export function usePrepareErc20RemoveFacilitator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'removeFacilitator'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'removeFacilitator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'removeFacilitator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareErc20RenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'renounceRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'renounceRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareErc20RevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'revokeRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'revokeRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"setFacilitatorBucketCapacity"`.
 */
export function usePrepareErc20SetFacilitatorBucketCapacity(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc20ABI,
      'setFacilitatorBucketCapacity'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'setFacilitatorBucketCapacity',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc20ABI,
    'setFacilitatorBucketCapacity'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    address: erc20Address,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"FacilitatorAdded"`.
 */
export function useErc20FacilitatorAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'FacilitatorAdded'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'FacilitatorAdded',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'FacilitatorAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"FacilitatorBucketCapacityUpdated"`.
 */
export function useErc20FacilitatorBucketCapacityUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'FacilitatorBucketCapacityUpdated'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'FacilitatorBucketCapacityUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof erc20ABI,
    'FacilitatorBucketCapacityUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"FacilitatorBucketLevelUpdated"`.
 */
export function useErc20FacilitatorBucketLevelUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'FacilitatorBucketLevelUpdated'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'FacilitatorBucketLevelUpdated',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'FacilitatorBucketLevelUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"FacilitatorRemoved"`.
 */
export function useErc20FacilitatorRemovedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'FacilitatorRemoved'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'FacilitatorRemoved',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'FacilitatorRemoved'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useErc20RoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'RoleAdminChanged'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'RoleAdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useErc20RoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'RoleGranted'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'RoleGranted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useErc20RoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'RoleRevoked'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'RoleRevoked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    address: erc20Address,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useErc721DomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 */
export function useErc721PermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"WETH9"`.
 */
export function useErc721Weth9<
  TFunctionName extends 'WETH9',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'WETH9',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"baseURI"`.
 */
export function useErc721BaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"factory"`.
 */
export function useErc721Factory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"positions"`.
 */
export function useErc721Positions<
  TFunctionName extends 'positions',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'positions',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721TokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useErc721TokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
    abi: erc721ABI,
    address: erc721Address,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"burn"`.
 */
export function useErc721Burn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof erc721ABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'burn', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"collect"`.
 */
export function useErc721Collect<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'collect'
        >['request']['abi'],
        'collect',
        TMode
      > & { functionName?: 'collect' }
    : UseContractWriteConfig<typeof erc721ABI, 'collect', TMode> & {
        abi?: never
        functionName?: 'collect'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'collect', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'collect',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`.
 */
export function useErc721CreateAndInitializePoolIfNecessary<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'createAndInitializePoolIfNecessary'
        >['request']['abi'],
        'createAndInitializePoolIfNecessary',
        TMode
      > & { functionName?: 'createAndInitializePoolIfNecessary' }
    : UseContractWriteConfig<
        typeof erc721ABI,
        'createAndInitializePoolIfNecessary',
        TMode
      > & {
        abi?: never
        functionName?: 'createAndInitializePoolIfNecessary'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721ABI,
    'createAndInitializePoolIfNecessary',
    TMode
  >({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'createAndInitializePoolIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"decreaseLiquidity"`.
 */
export function useErc721DecreaseLiquidity<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'decreaseLiquidity'
        >['request']['abi'],
        'decreaseLiquidity',
        TMode
      > & { functionName?: 'decreaseLiquidity' }
    : UseContractWriteConfig<typeof erc721ABI, 'decreaseLiquidity', TMode> & {
        abi?: never
        functionName?: 'decreaseLiquidity'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'decreaseLiquidity', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'decreaseLiquidity',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"increaseLiquidity"`.
 */
export function useErc721IncreaseLiquidity<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'increaseLiquidity'
        >['request']['abi'],
        'increaseLiquidity',
        TMode
      > & { functionName?: 'increaseLiquidity' }
    : UseContractWriteConfig<typeof erc721ABI, 'increaseLiquidity', TMode> & {
        abi?: never
        functionName?: 'increaseLiquidity'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'increaseLiquidity', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'increaseLiquidity',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"mint"`.
 */
export function useErc721Mint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof erc721ABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'mint', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"multicall"`.
 */
export function useErc721Multicall<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'multicall'
        >['request']['abi'],
        'multicall',
        TMode
      > & { functionName?: 'multicall' }
    : UseContractWriteConfig<typeof erc721ABI, 'multicall', TMode> & {
        abi?: never
        functionName?: 'multicall'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'multicall', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'multicall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"permit"`.
 */
export function useErc721Permit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof erc721ABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'permit', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"refundETH"`.
 */
export function useErc721RefundEth<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'refundETH'
        >['request']['abi'],
        'refundETH',
        TMode
      > & { functionName?: 'refundETH' }
    : UseContractWriteConfig<typeof erc721ABI, 'refundETH', TMode> & {
        abi?: never
        functionName?: 'refundETH'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'refundETH', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'refundETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermit"`.
 */
export function useErc721SelfPermit<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'selfPermit'
        >['request']['abi'],
        'selfPermit',
        TMode
      > & { functionName?: 'selfPermit' }
    : UseContractWriteConfig<typeof erc721ABI, 'selfPermit', TMode> & {
        abi?: never
        functionName?: 'selfPermit'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'selfPermit', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermitAllowed"`.
 */
export function useErc721SelfPermitAllowed<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'selfPermitAllowed'
        >['request']['abi'],
        'selfPermitAllowed',
        TMode
      > & { functionName?: 'selfPermitAllowed' }
    : UseContractWriteConfig<typeof erc721ABI, 'selfPermitAllowed', TMode> & {
        abi?: never
        functionName?: 'selfPermitAllowed'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'selfPermitAllowed', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermitAllowed',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`.
 */
export function useErc721SelfPermitAllowedIfNecessary<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'selfPermitAllowedIfNecessary'
        >['request']['abi'],
        'selfPermitAllowedIfNecessary',
        TMode
      > & { functionName?: 'selfPermitAllowedIfNecessary' }
    : UseContractWriteConfig<
        typeof erc721ABI,
        'selfPermitAllowedIfNecessary',
        TMode
      > & {
        abi?: never
        functionName?: 'selfPermitAllowedIfNecessary'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721ABI,
    'selfPermitAllowedIfNecessary',
    TMode
  >({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermitAllowedIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermitIfNecessary"`.
 */
export function useErc721SelfPermitIfNecessary<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'selfPermitIfNecessary'
        >['request']['abi'],
        'selfPermitIfNecessary',
        TMode
      > & { functionName?: 'selfPermitIfNecessary' }
    : UseContractWriteConfig<
        typeof erc721ABI,
        'selfPermitIfNecessary',
        TMode
      > & {
        abi?: never
        functionName?: 'selfPermitIfNecessary'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'selfPermitIfNecessary', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermitIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"sweepToken"`.
 */
export function useErc721SweepToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'sweepToken'
        >['request']['abi'],
        'sweepToken',
        TMode
      > & { functionName?: 'sweepToken' }
    : UseContractWriteConfig<typeof erc721ABI, 'sweepToken', TMode> & {
        abi?: never
        functionName?: 'sweepToken'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'sweepToken', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'sweepToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"uniswapV3MintCallback"`.
 */
export function useErc721UniswapV3MintCallback<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'uniswapV3MintCallback'
        >['request']['abi'],
        'uniswapV3MintCallback',
        TMode
      > & { functionName?: 'uniswapV3MintCallback' }
    : UseContractWriteConfig<
        typeof erc721ABI,
        'uniswapV3MintCallback',
        TMode
      > & {
        abi?: never
        functionName?: 'uniswapV3MintCallback'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'uniswapV3MintCallback', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'uniswapV3MintCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"unwrapWETH9"`.
 */
export function useErc721UnwrapWeth9<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'unwrapWETH9'
        >['request']['abi'],
        'unwrapWETH9',
        TMode
      > & { functionName?: 'unwrapWETH9' }
    : UseContractWriteConfig<typeof erc721ABI, 'unwrapWETH9', TMode> & {
        abi?: never
        functionName?: 'unwrapWETH9'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'unwrapWETH9', TMode>({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'unwrapWETH9',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareErc721Burn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"collect"`.
 */
export function usePrepareErc721Collect(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'collect'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'collect',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'collect'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`.
 */
export function usePrepareErc721CreateAndInitializePoolIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721ABI,
      'createAndInitializePoolIfNecessary'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'createAndInitializePoolIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721ABI,
    'createAndInitializePoolIfNecessary'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"decreaseLiquidity"`.
 */
export function usePrepareErc721DecreaseLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'decreaseLiquidity'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'decreaseLiquidity',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'decreaseLiquidity'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"increaseLiquidity"`.
 */
export function usePrepareErc721IncreaseLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'increaseLiquidity'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'increaseLiquidity',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'increaseLiquidity'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareErc721Mint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"multicall"`.
 */
export function usePrepareErc721Multicall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'multicall'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'multicall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'multicall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareErc721Permit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'permit'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'permit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"refundETH"`.
 */
export function usePrepareErc721RefundEth(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'refundETH'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'refundETH',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'refundETH'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermit"`.
 */
export function usePrepareErc721SelfPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'selfPermit'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'selfPermit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermitAllowed"`.
 */
export function usePrepareErc721SelfPermitAllowed(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'selfPermitAllowed'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermitAllowed',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'selfPermitAllowed'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`.
 */
export function usePrepareErc721SelfPermitAllowedIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721ABI,
      'selfPermitAllowedIfNecessary'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermitAllowedIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721ABI,
    'selfPermitAllowedIfNecessary'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"selfPermitIfNecessary"`.
 */
export function usePrepareErc721SelfPermitIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'selfPermitIfNecessary'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'selfPermitIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'selfPermitIfNecessary'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"sweepToken"`.
 */
export function usePrepareErc721SweepToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'sweepToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'sweepToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'sweepToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"uniswapV3MintCallback"`.
 */
export function usePrepareErc721UniswapV3MintCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'uniswapV3MintCallback'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'uniswapV3MintCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'uniswapV3MintCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"unwrapWETH9"`.
 */
export function usePrepareErc721UnwrapWeth9(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'unwrapWETH9'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    address: erc721Address,
    functionName: 'unwrapWETH9',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'unwrapWETH9'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Collect"`.
 */
export function useErc721CollectEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Collect'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    eventName: 'Collect',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Collect'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"DecreaseLiquidity"`.
 */
export function useErc721DecreaseLiquidityEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'DecreaseLiquidity'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    eventName: 'DecreaseLiquidity',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'DecreaseLiquidity'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"IncreaseLiquidity"`.
 */
export function useErc721IncreaseLiquidityEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'IncreaseLiquidity'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    eventName: 'IncreaseLiquidity',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'IncreaseLiquidity'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    address: erc721Address,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}
