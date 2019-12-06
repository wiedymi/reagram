import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const Notifications = (props: Props) => (
  <Wrapper>
    Notifications context
  </Wrapper>
)

Notifications.defaultProps = {
  // bla: 'test',
}

export default Notifications
