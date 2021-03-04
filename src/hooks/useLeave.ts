import {useCallback} from 'react'

import useGrape from './useGrape'
import {useWallet} from 'use-wallet'

import {leave, getXGrapeStakingContract} from '../grape/utils'

const useLeave = () => {
  const {account} = useWallet()
  const grape = useGrape()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXGrapeStakingContract(grape),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, grape],
  )

  return {onLeave: handle}
}

export default useLeave
