import React, { ReactNode } from 'react'
import { Wrapper } from './styles'
import { Menu, Chat } from './subcomponents'

const LeftMenu = (): ReactNode => (
  <Wrapper>
    <Menu />
    <Chat />
  </Wrapper>
)

LeftMenu.defaultProps = {
  // bla: 'test',
}

export default LeftMenu
