import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterSommContract, getFarms } from '../grape/utils'
import useGrape from './useGrape'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const grape = useGrape()
  const farms = getFarms(grape)
  const masterSommContract = getMasterSommContract(grape)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterSommContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterSommContract, grape])

  useEffect(() => {
    if (account && masterSommContract && grape) {
      fetchAllBalances()
    }
  }, [account, block, masterSommContract, setBalance, grape])

  return balances
}

export default useAllEarnings
