import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useGrape from './useGrape'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMasterSommContract } from '../grape/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const grape = useGrape()
  const masterSommContract = getMasterSommContract(grape)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      masterSommContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, masterSommContract, lpContract])

  useEffect(() => {
    if (account && masterSommContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterSommContract, lpContract])

  return allowance
}

export default useAllowance
