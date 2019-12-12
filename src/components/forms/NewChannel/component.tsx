import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import * as S from './styles'

const CreateGroup = (): ReactNode => {
  return (
    <S.Wrapper>
      <C.SelectImage />
      <C.Input type="text" value={''} label={`Channel Name`} variant="outlined" fluid />
      <C.Input
        type="text"
        value={''}
        label={`Description`}
        variant="outlined"
        placeholder="Description (Optional)"
        fluid
        helperText="You can provide an optional description for your channel."
      />
    </S.Wrapper>
  )
}

export default CreateGroup
