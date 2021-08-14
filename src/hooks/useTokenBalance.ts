// 首页显示数据
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract, getCakeContract, getRewardPool } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import web3 from 'utils/web3'
import { getMasterChefAddress, getRewardPoolAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { AbiItem } from 'web3-utils'
import rewardPoolAbi from 'config/abi/rewardPool.json'

import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const web3React = useWeb3()
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3React)
      try {
        const res = await contract.methods.balanceOf(account).call()
        setBalanceState({ balance: new BigNumber(res), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }
    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, web3React, fastRefresh, SUCCESS, FAILED])
  return balanceState
}
// 获取TotalSupply
export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getCakeContract()
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }
    fetchTotalSupply()
  }, [slowRefresh])
  return totalSupply
}
// 获取CurrentHalvingCycle
export const useCurrentHalvingCycle = () => {
  const { slowRefresh } = useRefresh()
  const [havingCycle, setHavingCycle] = useState<BigNumber>()
  useEffect(() => {
    async function fetchHavingCycle() {
      const masterChefContract = new web3.eth.Contract(masterChefABI as unknown as AbiItem, getMasterChefAddress())
      const cycle = await masterChefContract.methods.currentHalvingCycle().call()
      setHavingCycle(new BigNumber(cycle))
    }
    fetchHavingCycle()
  }, [slowRefresh])
  return havingCycle
}
// 获取Halving Block
export const useLastHalvingBlock = () => {
  const { slowRefresh } = useRefresh()
  const [havingBlock, setHavingBlock] = useState<BigNumber>()
  useEffect(() => {
    async function fetchHavingCycle() {
      const masterChefContract = new web3.eth.Contract(masterChefABI as unknown as AbiItem, getMasterChefAddress())
      const block = await masterChefContract.methods.lastHalvingBlock().call()
      setHavingBlock(new BigNumber(block))
    }
    fetchHavingCycle()
  }, [slowRefresh])
  return havingBlock
}
// 获取New Block
export const useCakePerBlock = () => {
  const { slowRefresh } = useRefresh()
  const [perBlock, setPerBlock] = useState<BigNumber>()
  useEffect(() => {
    async function fetchHavingCycle() {
      const masterChefContract = new web3.eth.Contract(masterChefABI as unknown as AbiItem, getMasterChefAddress())
      const block = await masterChefContract.methods.cakePerBlock().call()
      setPerBlock(new BigNumber(block))
    }
    fetchHavingCycle()
  }, [slowRefresh])

  return perBlock
}
// 销毁的
export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()
  const web3React = useWeb3()
  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3React)
      const res = await contract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }
    fetchBalance()
  }, [web3React, tokenAddress, slowRefresh])

  return balance
}
// 等值BNB
export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const web3React = useWeb3()
  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await web3React.eth.getBalance(account)
      setBalance(new BigNumber(walletBalance))
    }
    if (account) {
      fetchBalance()
    }
  }, [account, web3React, lastUpdated, setBalance])
  return { balance, refresh: setLastUpdated }
}

// Reward Pool 数据
export const useCurrentTotalVolumePower = () => {
  const { slowRefresh } = useRefresh()
  const [totalVolume, setTotalVolume] = useState<BigNumber>()
  useEffect(() => {
    async function fetchTotalVolumePower() {
      const rewardPoolContract = getRewardPool()
      const volume = await rewardPoolContract.methods.currentTotalVolumePower().call()
      setTotalVolume(new BigNumber(volume))
    }
    fetchTotalVolumePower()
  }, [slowRefresh])
  return totalVolume
}
export const useTotalFelCatReward = () => {
  const { slowRefresh } = useRefresh()
  const [totalReward, setTotalVolume] = useState<BigNumber>()
  useEffect(() => {
    async function fetchTotalReward() {
      const rewardPoolContract = getRewardPool()
      const reward = await rewardPoolContract.methods.getTotalFelCatReward().call()
      setTotalVolume(new BigNumber(reward))
    }
    fetchTotalReward()
  }, [slowRefresh])
  return totalReward
}
export const useUserLastWithdrawBlock = () => {
  const { slowRefresh } = useRefresh()
  const [lastBlock, setLastBlock] = useState<BigNumber>()
  const web3React = useWeb3()
  const { account } = useWeb3React()
  useEffect(() => {
    async function fetchLastBlock() {
      const rewardPoolContract = getRewardPool()
      const block = await rewardPoolContract.methods.getUserlastWithdrawBlock(account).call()
      setLastBlock(new BigNumber(block))
    }
    fetchLastBlock()
  }, [account, web3React, slowRefresh])
  return lastBlock
}
// 需要参数
export const usePendingReward = () => {
  const { slowRefresh } = useRefresh()
  const [pendingReward, setLastBlock] = useState<BigNumber>()
  const web3React = useWeb3()
  const { account } = useWeb3React()
  useEffect(() => {
    async function fetchPendingReward() {
      const rewardPoolContract = getRewardPool()
      const reward = await rewardPoolContract.methods.pendingReward(account).call()
      setLastBlock(new BigNumber(reward))
    }
    fetchPendingReward()
  }, [account, web3React, slowRefresh])
  return pendingReward
}

export const useCurrentUserVolumePower = () => {
  const { slowRefresh } = useRefresh()
  const [pendingReward, setLastBlock] = useState<BigNumber>()
  const web3React = useWeb3()
  const { account } = useWeb3React()
  useEffect(() => {
    async function fetchCurrentUserVolumePower() {
      const rewardPoolContract = getRewardPool()
      const reward = await rewardPoolContract.methods.userCurrentVolumePower(account).call()
      setLastBlock(new BigNumber(reward))
    }
    fetchCurrentUserVolumePower()
  }, [account, web3React, slowRefresh])
  return pendingReward
}

export const useWithdrawReward = () => {
  const { slowRefresh } = useRefresh()
  const [pendingReward, setLastBlock] = useState<BigNumber>()
  const web3React = useWeb3()
  const { account } = useWeb3React()

  useEffect(() => {
    async function fetchWithdrawReward() {
      // const rewardPoolContract = getRewardPool()
      const rewardPoolContract = new web3.eth.Contract(rewardPoolAbi as unknown as AbiItem, getRewardPoolAddress())
      const reward = await rewardPoolContract.methods.withdrawReward(account).call()
      setLastBlock(new BigNumber(reward))
    }
    fetchWithdrawReward()
  }, [account, web3React, slowRefresh])
  return pendingReward
}

export default useTokenBalance
