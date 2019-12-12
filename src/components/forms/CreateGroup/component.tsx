import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const CreateGroup = (props: Props): ReactNode => {
  return (
    <S.Wrapper>
      <C.SelectImage />
      <C.Input type="text" value={''} label={`Group Name`} variant="outlined"
fluid />
    </S.Wrapper>
  )
}

export default CreateGroup
