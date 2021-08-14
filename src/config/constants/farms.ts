import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'FEL',
    lpAddresses: {
      97: '0xDAcbED0be6d2B393277cA490941060B4dB9537D2',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.fel,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'FEL-BNB LP',
    lpAddresses: {
      97: '0x0961D40a24A7963742486E1A589ca8Dc35147046',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.fel,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'FEL-BUSD LP',
    lpAddresses: {
      97: '0xC52c95c888FA554cD2450c2938061F28655B0f0B',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.fel,
    quoteToken: tokens.busd,
  },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
  {
    pid: 3,
    lpSymbol: 'PDD-BNB LP',
    lpAddresses: {
      97: '0x2DdF03B21F8277b1ff1169F7e62Aa07a730F7E06',
      56: '0x41f049d990d38305504631c9835f6f856bf1ba67',
    },
    token: tokens.pdd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'PDD-BUSD LP',
    lpAddresses: {
      97: '0x2efAD290579e975c67a46E4727Ad32BE7974513E',
      56: '0x2efAD290579e975c67a46E4727Ad32BE7974513E',
    },
    token: tokens.pdd,
    quoteToken: tokens.busd,
  },
  {
    pid: 5,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0xB32445F535F98b0DCE92a918Ecc11EB7fA8a274b',
      56: '0x8853e3309a31583ea438f7704681f46f0d4d909b',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 6,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '0x9879750226DFE81808cBF21e9D22e84C5FCAE4E6',
      56: '0x48028de4a9b0d3d91180333d796021ec7757ba1b',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
  },
  {
    pid: 7,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0x2BE075096fa45F0A18e4e4A8EE6C5174cC22edd8',
      56: '0x4dcA4D427511bC327639b222DA18FA5e334F686F',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xb9C0997E4CC280374d70aFA5e785639a0C1a636E',
      56: '0x4dcA4D427511bC327639b222DA18FA5e334F686F',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  }
]

export default farms
