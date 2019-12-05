import React, { ReactNode } from 'react'
import { Input, SelectImage } from '@/components/base'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode;
}

const CreateGroup = (props: Props): ReactNode => {
  return (
    <Wrapper>
      <SelectImage />
      <Input type="text" value={''} label={`Group Name`} variant="outlined"
fluid />
    </Wrapper>
  )
}
CreateGroup.defaultProps = {
  // bla: 'test',
}

export default CreateGroup
