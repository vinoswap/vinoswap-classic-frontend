import { useCallback } from 'react'

import useGrape from './useGrape'
import { useWallet } from 'use-wallet'

import { harvest, getMasterSommContract } from '../grape/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const grape = useGrape()
  const masterSommContract = getMasterSommContract(grape)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterSommContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, grape])

  return { onReward: handleReward }
}

export default useReward
