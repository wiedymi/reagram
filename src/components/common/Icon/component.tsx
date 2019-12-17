import React, { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  children: ReactNode
}

const Icon = (props: Props): ReactNode => (
  <S.Wrapper>
    <S.Icon {...props} />
  </S.Wrapper>
)

export default Icon
