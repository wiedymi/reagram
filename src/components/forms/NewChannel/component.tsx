import React, { ReactNode } from 'react'
import * as B from '@/components/base'
import * as S from './styles'

const CreateGroup = (): ReactNode => {
  return (
    <S.Wrapper>
      <B.SelectImage />
      <B.Input type="text" value={''} label={`Channel Name`} variant="outlined"
fluid />
      <B.Input
        type="text"
        value={''}
        label={`Description`}
        variant="outlined"
        placeholder="Description (Optional)"
        fluid
        helperText="You can provide an optional description for your channel."/>
    </S.Wrapper>
  )
}

export default CreateGroup
