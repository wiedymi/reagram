import React, { ReactNode } from 'react'
import { Wrapper, Input } from './styles'

const SelectInput = (): ReactNode => (
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
