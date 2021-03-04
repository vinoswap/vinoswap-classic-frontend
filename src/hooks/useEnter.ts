import {useCallback} from 'react'

import useGrape from './useGrape'
import {useWallet} from 'use-wallet'

import {enter, getXGrapeStakingContract} from '../grape/utils'

const useEnter = () => {
  const {account} = useWallet()
  const grape = useGrape()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXGrapeStakingContract(grape),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, grape],
  )

  return {onEnter: handle}
}

export default useEnter
