import React, { ReactNode } from 'react'
import { Wrapper, Img, Progress, Text, Content } from './styles'

const Loading = (): ReactNode => (
  <Wrapper>
    <Img src="/assert/logo.png" />
    <Content>
      <Progress />
      <Text variant="h5">Loading...</Text>
    </Content>
  </Wrapper>
)

export default Loading
