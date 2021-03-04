import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Grape } from '../../grape'

export interface GrapeContext {
  grape?: typeof Grape
}

export const Context = createContext<GrapeContext>({
  grape: undefined,
})

declare global {
  interface Window {
    grapesauce: any
  }
}

const GrapeProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [grape, setGrape] = useState<any>()

  // @ts-ignore
  window.grape = grape
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const grapeLib = new Grape(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setGrape(grapeLib)
      window.grapesauce = grapeLib
    }
  }, [ethereum])

  return <Context.Provider value={{ grape }}>{children}</Context.Provider>
}

export default GrapeProvider
