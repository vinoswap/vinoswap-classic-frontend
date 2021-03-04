import {useCallback} from 'react'

import useGrape from './useGrape'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getGrapeContract,
  getXGrapeStakingContract
} from '../grape/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const grape = useGrape()
  const lpContract = getGrapeContract(grape)
  const contract = getXGrapeStakingContract(grape)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
