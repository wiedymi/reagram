import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode;
}

const ChannelInfo = (props: Props) => <Wrapper>ChannelInfo context</Wrapper>

ChannelInfo.defaultProps = {
  // bla: 'test',
}

export default ChannelInfo
