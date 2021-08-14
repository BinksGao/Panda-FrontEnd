/*
 * @Description: 
 * @author: gaohuan
 * @Date: 2021-06-12 17:49:28
 * @LastEditTime: 2021-07-29 23:10:57
 */
import React from 'react'
import styled from 'styled-components'
import { Text, Image } from 'bambooswap-frontend-uikit'

export interface FarmProps {
  label: string
  pid: number
  image: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label }) => {

  return (
    <Container>
      <IconImage src={`/images/farms/${image}.svg`} alt="icon" width={40} height={40} mr="8px" />
      <div>
        <Text bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
