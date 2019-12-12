import React, { ReactNode } from 'react'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const Component = (props: Props): ReactNode => (
  <S.Wrapper>
    {props.inputType === 'outlined' ? <S.OutlinedInput {...props} /> : <S.Input {...props} />}
  </S.Wrapper>
)

export default Component
