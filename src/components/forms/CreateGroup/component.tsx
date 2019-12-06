import React, { ReactNode } from 'react'
import * as B from '@/components/base'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const CreateGroup = (props: Props): ReactNode => {
  return (
    <S.Wrapper>
      <B.SelectImage />
      <B.Input type="text" value={''} label={`Group Name`} variant="outlined"
fluid />
    </S.Wrapper>
  )
}
CreateGroup.defaultProps = {
  // bla: 'test',
}

export default CreateGroup
