import React, { useCallback, useState } from 'react'
import { Button, Card, CardBody, Heading, Text } from 'bambooswap-frontend-uikit'
import styled from 'styled-components'
import { useTotalFelCatReward, useCurrentTotalVolumePower, useUserLastWithdrawBlock, usePendingReward, useCurrentUserVolumePower, withdrawReward } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { usePriceCakeBusd } from 'state/hooks'
import { BIG_TEN } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import CardValue from './CardValue'

const StyledRewardCard = styled(Card)`
  width: 100%;
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
  flex: 1;
  div {
    flex: 1;
    width: 33.3%;
  }
  div:nth-child(2), div:nth-child(3) {
    text-align: right;
  }
`
const Actions = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`

const RewardCard = () => {
  const [pendingTx, setPendingTx] = useState(false)

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const cakePriceBusd = usePriceCakeBusd() || 0
  const totalReward = (new BigNumber(useTotalFelCatReward()).dividedBy(BIG_TEN.pow(18)).toNumber()) || 0
  const totalRewardPrice = (new BigNumber(useTotalFelCatReward()).dividedBy(BIG_TEN.pow(18)).multipliedBy(cakePriceBusd).toNumber()) || 0

  const totalVolumePower = new BigNumber(useCurrentTotalVolumePower()).dividedBy(BIG_TEN.pow(18)).toNumber() || 0
  const totalVolumePowerPrice = new BigNumber(useCurrentTotalVolumePower()).dividedBy(BIG_TEN.pow(18)).multipliedBy(cakePriceBusd).toNumber() || 0
  const lastBlock = new BigNumber(useUserLastWithdrawBlock()).toNumber() || 0
  const pendingReward =  new BigNumber(usePendingReward()).dividedBy(BIG_TEN.pow(18)).toNumber() || 0 
  const pendingRewardPrice =  new BigNumber(usePendingReward()).dividedBy(BIG_TEN.pow(18)).multipliedBy(cakePriceBusd).toNumber() || 0 
  
  // 这里报错
  const userVolumePower =  new BigNumber(useCurrentUserVolumePower()).dividedBy(BIG_TEN.pow(18)).toNumber() || 0 
  const userVolumePowerPrice =  new BigNumber(useCurrentUserVolumePower()).dividedBy(BIG_TEN.pow(18)).multipliedBy(cakePriceBusd).toNumber() || 0 

  // 计算奖励池
  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
      try {
        await withdrawReward(account)
      } catch (error) {
        window.console.log(error)
      }
    setPendingTx(false)
  }, [account])
  return (
    <StyledRewardCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {t('FEL Reward')}
        </Heading>
        <Row>
          <Text fontSize="14px">{}</Text>
          <Text fontSize="14px">{t('Amount')}</Text>
          <Text fontSize="14px">{t('Price')}</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total FEL Reward')}</Text>
          {totalReward && <CardValue fontSize="14px" value={totalReward}/>}
          {totalReward && <CardValue fontSize="14px" value={totalRewardPrice} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Trading Power')}</Text>
          {totalVolumePower && <CardValue fontSize="14px" value={totalVolumePower} />}
          {totalVolumePower && <CardValue fontSize="14px" value={totalVolumePowerPrice} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Last Withdraw Block')}</Text>
          {lastBlock ? <CardValue fontSize="14px" value={lastBlock} /> : <CardValue fontSize="14px" value={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Your Trading Power')}</Text> 
          {userVolumePower && <CardValue fontSize="14px" value={userVolumePower || 0.00} />}
          {userVolumePower && <CardValue fontSize="14px" value={userVolumePowerPrice || 0.00} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Earned')}</Text>
          {pendingReward ? <CardValue fontSize="14px" value={pendingReward} /> : <CardValue fontSize="14px" value={0} />}
          {pendingReward ? <CardValue fontSize="14px" value={pendingRewardPrice} /> : <CardValue fontSize="14px" value={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Note:The reward can be withdrawn every 7 days.')}</Text>
        </Row>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={pendingReward === 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {t('Harvest')}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledRewardCard>
  )
}

export default RewardCard


