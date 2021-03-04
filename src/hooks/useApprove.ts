import { useCallback } from 'react'

import useGrape from './useGrape'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterSommContract } from '../grape/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const grape = useGrape()
  const masterSommContract = getMasterSommContract(grape)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterSommContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterSommContract])

  return { onApprove: handleApprove }
}

export default useApprove
