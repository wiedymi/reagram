import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Wrapper } from './styles'
interface Props {
  children: ReactNode;
}

const Component = ({ children }: Props): ReactNode => {
  return (
    <Wrapper>
      <CssBaseline />
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default Component
