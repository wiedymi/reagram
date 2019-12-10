import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const RightMenu = (props: Props) => <Wrapper>RightMenu context{props.openedChat}</Wrapper>

export default RightMenu
