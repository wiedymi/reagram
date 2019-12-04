import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const NewGroup = (props: Props) => (
  <Wrapper>
    NewGroup context
  </Wrapper>
)

NewGroup.defaultProps = {
  // bla: 'test',
}

export default NewGroup
