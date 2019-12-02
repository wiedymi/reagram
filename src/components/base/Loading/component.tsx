import React, { ReactNode } from 'react'
import { Wrapper, Img, Progress, Text, Content } from './styles'

type Props = {
  children: ReactNode
}

const Loading = (props: Props) => (
  <Wrapper>
    <Img src="/assert/logo.png" />
    <Content>
      <Progress />
      <Text variant="h5">Loading...</Text>
    </Content>
  </Wrapper>
)

export default Loading
