import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

interface Props {
  children: ReactNode
}

const Component = ({ children }: Props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">{children}</Container>
    </React.Fragment>
  )
}

export default Component
