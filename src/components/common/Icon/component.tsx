import React, { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const Icon = (props: Props): ReactNode => (
  <S.Wrapper>
    <S.Icon image={props.image} size={props.size} sizeIcon={props.sizeIcon} />
  </S.Wrapper>
)

export default Icon
