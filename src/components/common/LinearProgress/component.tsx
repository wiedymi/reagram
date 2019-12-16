import React, { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const Component = (props: Props): ReactNode => (
  <S.Wrapper onClick={props.handleClick}>
    <S.Meter value={props.value}>
      <S.Circle />
    </S.Meter>
    <S.Line />
  </S.Wrapper>
)

export default Component
