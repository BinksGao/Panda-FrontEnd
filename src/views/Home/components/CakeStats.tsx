import React from 'react'
import { Card, CardBody, Heading, Text } from 'bambooswap-frontend-uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance, useCurrentHalvingCycle, useLastHalvingBlock, useCakePerBlock } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  div {
    grid-column: span 12;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const havingCycle = Number(new BigNumber(useCurrentHalvingCycle()).toJSON()) || 0
  const havingBlock = Number(new BigNumber(useLastHalvingBlock()).toJSON()) || 0
  const perBlock = Number(getBalanceNumber(useCakePerBlock())) || 0
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="lg" mb="24px">
          {t('FEL Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total FEL Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Current Halving Cycle')}</Text>
          {havingCycle && <CardValue fontSize="14px" value={(havingCycle)} decimals={0} length={0}/>}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Last Halving Block')}</Text>
          {havingBlock && <CardValue fontSize="14px" value={(havingBlock)} decimals={0} length={0}/>}
        </Row>
        <Row>
          <Text fontSize="14px">{t('New FEL block')}</Text>
          {perBlock && <CardValue fontSize="14px" value={(perBlock)} decimals={4} length={4}/>}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
