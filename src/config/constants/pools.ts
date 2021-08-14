/*
 * @Description: 单币挖矿
 * @author: gaohuan
 * @Date: 2021-06-12 17:49:28
 * @LastEditTime: 2021-07-04 22:26:10
 */
import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.fel,
    earningToken: tokens.fel,
    contractAddress: {
      97: '0xDAcbED0be6d2B393277cA490941060B4dB9537D2',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  }
]

export default pools
