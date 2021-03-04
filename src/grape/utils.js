import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterSommAddress = (grape) => {
  return grape && grape.masterSommAddress
}
export const getGrapeAddress = (grape) => {
  return grape && grape.grapeAddress
}
export const getWethContract = (grape) => {
  return grape && grape.contracts && grape.contracts.weth
}

export const getMasterSommContract = (grape) => {
  return grape && grape.contracts && grape.contracts.masterSomm
}
export const getGrapeContract = (grape) => {
  return grape && grape.contracts && grape.contracts.grape
}

export const getXGrapeStakingContract = (grape) => {
  return grape && grape.contracts && grape.contracts.xGrapeStaking
}

export const getFarms = (grape) => {
  return grape
    ? grape.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'grape',
          earnTokenAddress: grape.contracts.grape.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (masterSommContract, pid) => {
  const { allocPoint } = await masterSommContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterSommContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterSommContract, pid, account) => {
  return masterSommContract.methods.pendingGrape(pid, account).call()
}

export const getTotalLPWethValue = async (
  masterSommContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterSommContract owns
  const balance = await lpContract.methods
    .balanceOf(masterSommContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterSommContract, pid),
  }
}

export const approve = async (lpContract, masterSommContract, account) => {
  return lpContract.methods
    .approve(masterSommContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getGrapeSupply = async (grape) => {
  return new BigNumber(await grape.contracts.grape.methods.totalSupply().call())
}

export const getXGrapeSupply = async (grape) => {
  return new BigNumber(await grape.contracts.xGrapeStaking.methods.totalSupply().call())
}

export const stake = async (masterSommContract, pid, amount, account) => {
  return masterSommContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterSommContract, pid, amount, account) => {
  return masterSommContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterSommContract, pid, account) => {
  return masterSommContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterSommContract, pid, account) => {
  try {
    const { amount } = await masterSommContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterSommContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterSommContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}
