import React, { ReactNode } from 'react'
import { Input, SelectImage } from '@/components/base'
import { Wrapper } from './styles'

const CreateGroup = (): ReactNode => {
  return (
    <Wrapper>
      <SelectImage />
      <Input type="text" value={''} label={`Channel Name`} variant="outlined"
fluid />
      <Input
        type="text"
        value={''}
        label={`Description`}
        variant="outlined"
        placeholder="Description (Optional)"
        fluid
        helperText="You can provide an optional description for your channel."/>
    </Wrapper>
  )
}

export default CreateGroup
