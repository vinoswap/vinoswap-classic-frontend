import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useGrape from '../../hooks/useGrape'

import { bnToDec } from '../../utils'
import { getMasterSommContract, getEarned } from '../../grape/utils'
import { getFarms } from '../../grape/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const grape = useGrape()
  const { account } = useWallet()

  const farms = getFarms(grape)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
