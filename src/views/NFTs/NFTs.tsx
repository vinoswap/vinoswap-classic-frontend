import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import champagne from '../../assets/img/champagne.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import NFTCards from './components/NFTCards'

const NFTs: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={champagne} height="120" />}
                subtitle="Browse the latest VinoSwap NFTs."
                title="Bienvenue sur le Marché"
              />
              <div
                style={{
                  alignItems: 'center',
                  marginBottom: '2%'
                }}
              >
                 
              </div>
              <NFTCards />
            </Route>
            {/* <Route path={`${path}/:farmId`}>
              <Farm />
            </Route> */}
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default NFTs