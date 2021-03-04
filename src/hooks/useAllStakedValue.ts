import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterSommContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../grape/utils'
import useGrape from './useGrape'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const grape = useGrape()
  const farms = getFarms(grape)
  const masterSommContract = getMasterSommContract(grape)
  const wethContact = getWethContract(grape)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            masterSommContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterSommContract, grape])

  useEffect(() => {
    if (account && masterSommContract && grape) {
      fetchAllStakedValue()
    }
  }, [account, block, masterSommContract, setBalance, grape])

  return balances
}

export default useAllStakedValue
