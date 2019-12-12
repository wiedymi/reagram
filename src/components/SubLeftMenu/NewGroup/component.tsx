import React, { ReactNode } from 'react'
import { CreateGroup } from '@/components/forms'
import * as S from './styles'

const NewGroup = (): ReactNode => {
  return (
    <S.Wrapper>
      <CreateGroup />
    </S.Wrapper>
  )
}

export default NewGroup
