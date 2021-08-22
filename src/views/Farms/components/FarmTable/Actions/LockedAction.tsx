/*
 * @Description: 
 * @author: gaohuan
 * @Date: 2021-08-22 16:44:40
 * @LastEditTime: 2021-08-22 16:55:03
 */
import React, { useRef, useEffect } from 'react'
import { Skeleton } from 'bambooswap-frontend-uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { useCountUp } from 'react-countup'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

interface LockedActionProps extends FarmWithStakedValue {
    userDataReady: boolean
}

const LockedAction: React.FunctionComponent<LockedActionProps> = ({ pid, userData, userDataReady }) => {
    const lockedBigNumber = new BigNumber(userData.locked)
    const cakePrice = usePriceCakeBusd()
    let locked = BIG_ZERO
    let lockedBusd = 0
    let displayLockedBalance = userDataReady ? locked.toLocaleString() : <Skeleton width={60} />
    // If user didn't connect wallet default balance will be 0

    if (!lockedBigNumber.isZero()) {
        locked = getBalanceAmount(lockedBigNumber)
        lockedBusd = locked.multipliedBy(cakePrice).toNumber()
        displayLockedBalance = locked.toFixed(3, BigNumber.ROUND_DOWN)
    }
    const { t } = useTranslation()
    const { countUp, update } = useCountUp({
        start: 0,
        end: lockedBusd,
        duration: 1,
        separator: ',',
        decimals: 3,
    })
    const updateValue = useRef(update)

    useEffect(() => {
        updateValue.current(lockedBusd)
    }, [lockedBusd, updateValue])

    return (
        <ActionContainer>
            <ActionTitles style={{ marginBottom: 14 }}>
                <Title>FEL </Title>
                <Subtle>{t('Locked').toUpperCase()}</Subtle>
            </ActionTitles>
            <ActionContent>
                <div>
                    <Earned>{displayLockedBalance}</Earned>
                    <Staked>~{countUp}USD</Staked>
                </div>
            </ActionContent>
        </ActionContainer>
    )
}

export default LockedAction
