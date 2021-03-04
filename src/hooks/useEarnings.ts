import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterSommContract } from '../grape/utils'
import useGrape from './useGrape'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const grape = useGrape()
  const masterSommContract = getMasterSommContract(grape)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterSommContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterSommContract, grape])

  useEffect(() => {
    if (account && masterSommContract && grape) {
      fetchBalance()
    }
  }, [account, block, masterSommContract, setBalance, grape])

  return balance
}

export default useEarnings
