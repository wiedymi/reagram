import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const EditProfile = (props: Props) => (
  <Wrapper>
    EditProfile context
  </Wrapper>
)

EditProfile.defaultProps = {
  // bla: 'test',
}

export default EditProfile
