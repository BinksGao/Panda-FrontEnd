import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'FelicatSwap',
  description:
    'The most popular AMM on BSC by user count!',
  image: '',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('FelicatSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('FelicatSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('FelicatSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('FelicatSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('FelicatSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('FelicatSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('FelicatSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('FelicatSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('FelicatSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('FelicatSwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('FelicatSwap')}`,
      }
    default:
      return null
  }
}
