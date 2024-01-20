import { defineConfig } from '@wagmi/cli'
import {abi as lpMoneyAbi} from './contracts/out/LPMoney.sol/LPMoney.json'
import {abi as erc721ABI} from './src/data/uniswapCollection.json'
import {abi as erc20ABI} from './contracts/out/GhoMock.sol/GhoMock.json'
import { etherscan, react } from '@wagmi/cli/plugins'

import { arbitrum, mainnet } from 'wagmi/chains'


export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20ABI as any,
      address: '0x75b1f376006E9B031D7E2BE3d58e97B64bcbb2A5',
    },
    {
      name: 'LPMoney',
      abi: lpMoneyAbi as any,
      address: '0xdAAfC1F3B2C19bc1d3ca5602C4394f82387951B5',
    },
    {
      name: 'erc721',
      abi: erc721ABI as any,
      address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ARBISCAN_API_KEY!,
      chainId: arbitrum.id,
      contracts: [],
    }),
    react(),
  ],
})
