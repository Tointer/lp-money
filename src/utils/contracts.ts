export const formatDecimals = (amount: bigint, numberDecimals: number = 18, resultingDecimals: number = 2) => {
  return Number(amount/(BigInt(10)**BigInt(numberDecimals - resultingDecimals)))/(10**resultingDecimals)
}