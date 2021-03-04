import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterSommContract } from '../grape/utils'
import useGrape from './useGrape'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const grape = useGrape()
  const masterSommContract = getMasterSommContract(grape)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterSommContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, grape])

  useEffect(() => {
    if (account && grape) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, grape])

  return balance
}

export default useStakedBalance
