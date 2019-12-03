import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Wrapper } from './styles'
interface Props {
  children: ReactNode
}

const Component = ({ children }: Props) => {
  return (
    <Wrapper>
      <CssBaseline />
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default Component
