import { useCallback } from 'react'

import useGrape from './useGrape'
import { useWallet } from 'use-wallet'

import { unstake, getMasterSommContract } from '../grape/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const grape = useGrape()
  const masterSommContract = getMasterSommContract(grape)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterSommContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, grape],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
