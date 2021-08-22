import styled from 'styled-components'

const SecondaryCard = styled.div`
  align-items: start;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.textDisabled};
  border-radius: 32px;
  display: flex;
  padding: 20px;
`

export default SecondaryCard
