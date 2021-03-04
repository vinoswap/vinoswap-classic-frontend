import { useCallback } from 'react'

import useGrape from './useGrape'
import { useWallet } from 'use-wallet'

import { stake, getMasterSommContract } from '../grape/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const grape = useGrape()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterSommContract(grape),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, grape],
  )

  return { onStake: handleStake }
}

export default useStake
