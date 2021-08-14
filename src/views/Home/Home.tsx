import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from 'bambooswap-frontend-uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import RewardCard from 'views/Home/components/RewardCard'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding-top: 80px;
  margin-bottom: 10px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    background-position: left center, right center;
    height: 185px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 10px;
  grid-gap: 20px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }
`

const CTACards = styled(BaseLayout)`
  flex-direction: column;
  & > div {
    grid-column: span 12;
    width: 100%;
    & > div {
      width: 100%;
    }
  }
`
const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" >
          {t('FelicatSwap')}
        </Heading>
        <Text>{t('The popular AMM and yield farm on Binance Smart Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          <CTACards>
            <FarmStakingCard />
            <TotalValueLockedCard />
          </CTACards>
          <CTACards>
            <CakeStats />
            <RewardCard />
          </CTACards>
        </Cards>
      </div>
    </Page>
  )
}

export default Home
