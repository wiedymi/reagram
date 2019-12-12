import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode;
}

const RightMenu = (props: Props) => (
  <Wrapper hidden={props.openedChat === 0}>RightMenu context{props.openedChat}</Wrapper>
)

export default RightMenu
