/*
 * @Description: 锁仓的量
 * @Date: 2021-07-28 00:01:31
 * @LastEditTime: 2021-07-28 00:15:24
 */
import React from 'react'
import { Text } from 'bambooswap-frontend-uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceCakeBusd } from 'state/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 15px;
`

const CakeBlockedBalance = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning[1]._hex)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const cakePriceBusd = usePriceCakeBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(cakePriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} fontSize="24px" lineHeight="1.5" />
      {cakePriceBusd.gt(0) && <CardBusdValue value={earningsBusd} />}
    </Block>
  )
}

export default CakeBlockedBalance
