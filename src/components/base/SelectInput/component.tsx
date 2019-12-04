import React, { ReactNode } from 'react'
import { Wrapper, Input } from './styles'

type Props = {
  children: ReactNode;
}

const SelectInput = (props: Props): ReactNode => (
  <Wrapper>
    <Input
      label={`Country`}
      variant="outlined"
      select
      placeholder="Country"
      IconComponent="/assert/down.svg"
    >
      {children}
    </Input>
  </Wrapper>
)

SelectInput.defaultProps = {
  // bla: 'test',
}

export default SelectInput
