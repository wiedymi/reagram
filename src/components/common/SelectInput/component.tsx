import React, { ReactNode } from 'react'
import * as S from './styles'

const SelectInput = (): ReactNode => (
  <S.Wrapper>
    <S.Input
      label={`Country`}
      variant="outlined"
      select
      placeholder="Country"
      IconComponent="/assert/down.svg"
    >
      {children}
    </S.Input>
  </S.Wrapper>
)

export default SelectInput
