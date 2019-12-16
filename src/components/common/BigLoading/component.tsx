import React, { ReactNode } from 'react'
import * as S from './styles'

const Loading = (): ReactNode => (
  <S.Wrapper>
    <S.Img src="/assert/logo.png" />
    <S.Content>
      <S.Progress />
      <S.Text variant="h5">Loading...</S.Text>
    </S.Content>
  </S.Wrapper>
)

export default Loading
