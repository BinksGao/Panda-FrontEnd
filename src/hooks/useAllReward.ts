/*
 * @Description: 首页所有的挖矿收益
 * @author: gaohuan
 * @Date: 2021-08-15 18:28:11
 * @LastEditTime: 2021-08-15 19:09:23
 */
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import useRefresh from './useRefresh'

const useAllRewards = () => {
    const [balances, setBalance] = useState([])
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const fetchAllBalances = async () => {
            const calls = farmsConfig.filter((v) => v.pid !== 0).map((farm) => ({
                address: getMasterChefAddress(),
                name: 'pendingCake',
                params: [farm.pid, account],
            }))

            const rawEarnings = await multicall(masterChefABI, calls)
            const parsedEarnings = rawEarnings.map((earnings) => {
                return new BigNumber(earnings[0]._hex).toJSON()
            })
            const parsedEarningAll = []
            farmsConfig.filter((v) => v?.pid !== 0).forEach((item: any, index: number) => {
                parsedEarningAll.push({
                    pid: item?.pid,
                    earning: new BigNumber(parsedEarnings[index]).dividedBy(BIG_TEN.pow(18)).toNumber()
                })
            })
            setBalance(parsedEarningAll)
        }

        if (account) {
            fetchAllBalances()
        }
    }, [account, fastRefresh])

    return balances
}

export default useAllRewards
