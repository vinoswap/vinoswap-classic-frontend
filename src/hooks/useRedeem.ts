import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../grape/utils'

const useRedeem = (masterSommContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(masterSommContract, account)
    console.log(txHash)
    return txHash
  }, [account, masterSommContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
