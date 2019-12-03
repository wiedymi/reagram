import React, { ReactNode } from 'react'
import { Wrapper } from './styles'
import { Menu, Chat } from './subcomponents'

type Props = {
  children: ReactNode
}

const LeftMenu = (props: Props) => (
  <Wrapper>
    <Menu />
    <Chat />
  </Wrapper>
)

LeftMenu.defaultProps = {
  // bla: 'test',
}

export default LeftMenu
