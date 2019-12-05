import React, { ReactNode } from 'react'
import { Wrapper, Input, OutlinedInput } from './styles'

type Props = {
  children: ReactNode;
}

const Component = (props: Props): ReactNode => (
  <Wrapper>
    {props.inputType === 'outlined' ? <OutlinedInput {...props} /> : <Input {...props} />}
  </Wrapper>
)

export default Component
