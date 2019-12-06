import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const Language = (props: Props) => (
  <Wrapper>
    Language context
  </Wrapper>
)

Language.defaultProps = {
  // bla: 'test',
}

export default Language
