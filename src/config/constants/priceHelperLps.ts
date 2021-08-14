/*
 * @Description: 价格工具类
 * @author: gaohuan
 * @Date: 2021-06-12 17:49:28
 * @LastEditTime: 2021-07-06 21:36:38
 */

import tokens from './tokens'
import { FarmConfig } from './types'

const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xb9C0997E4CC280374d70aFA5e785639a0C1a636E',
      56: '0x7b3ae32eE8C532016f3E31C8941D937c59e055B9',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
]

export default priceHelperLps
