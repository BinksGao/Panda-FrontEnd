import React from 'react'
import { Text, Flex } from 'bambooswap-frontend-uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getCakeVaultEarnings } from 'views/Pools/helpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { useCakeVault } from 'state/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'

import { ActionContainer, ActionTitles, ActionContent } from './styles'

interface LockedActionProps extends Pool {
  userDataLoaded: boolean
}

const LockedAction: React.FunctionComponent<LockedActionProps> = ({
  earningToken,
  userData,
  isAutoVault,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const locked = userData?.pendingLocked ? new BigNumber(userData.pendingLocked) : BIG_ZERO
  // These will be reassigned later if its Auto FEL vault
  let earningTokenBalance = getBalanceNumber(locked, earningToken.decimals)
  let earningTokenDollarBalance = getBalanceNumber(locked.multipliedBy(earningTokenPrice), earningToken.decimals)
  let hasEarnings = locked.gt(0)

  // Auto FEL vault calculations
  const {
    userData: { cakeAtLastUserAction, userShares },
    pricePerFullShare,
  } = useCakeVault()
  const { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay } = getCakeVaultEarnings(
    account,
    cakeAtLastUserAction,
    userShares,
    pricePerFullShare,
    earningTokenPrice,
  )

  earningTokenBalance = isAutoVault ? autoCakeToDisplay : earningTokenBalance
  hasEarnings = isAutoVault ? hasAutoEarnings : hasEarnings
  earningTokenDollarBalance = isAutoVault ? autoUsdToDisplay : earningTokenDollarBalance

  const displayBalance = hasEarnings ? earningTokenBalance : 0

  const actionTitle = isAutoVault ? (
    <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
      {t('Recent FEL Locked')}
    </Text>
  ) : (
    <>
      <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
        {t('Locked')}
      </Text>
    </>
  )

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={displayBalance} />
          {hasEarnings ? (
            <Balance
              display="inline"
              fontSize="12px"
              color={hasEarnings ? 'textSubtle' : 'textDisabled'}
              decimals={2}
              value={earningTokenDollarBalance}
              unit=" USD"
              prefix="~"
            />
          ) : (
            <Text fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
              0 USD
            </Text>
          )}
        </Flex>
      </ActionContent>
    </ActionContainer>
  )
}

export default LockedAction
