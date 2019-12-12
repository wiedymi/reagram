import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import * as S from './styles'
interface Props {
  children: ReactNode
}

const Component = ({ children }: Props): ReactNode => {
  return (
    <S.Wrapper>
      <CssBaseline />
      <Container>{children}</Container>
    </S.Wrapper>
  )
}

export default Component
