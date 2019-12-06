import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const Privacy = (props: Props) => (
  <Wrapper>
    Privacy context
  </Wrapper>
)

Privacy.defaultProps = {
  // bla: 'test',
}

export default Privacy
