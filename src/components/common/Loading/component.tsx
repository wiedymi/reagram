import React, { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  children: ReactNode;
  message: string;
  error: boolean;
}

const Component = (props: Props): ReactNode => (
  <S.Wrapper width={props.width} height={props.width}>
    {!props.error && <S.Loading />}
    <S.Message>{props.message}</S.Message>
  </S.Wrapper>
)

export default Component
