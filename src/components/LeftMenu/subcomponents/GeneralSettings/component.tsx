import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const GeneralSettings = (props: Props) => (
  <Wrapper>
    GeneralSettings context
  </Wrapper>
)

GeneralSettings.defaultProps = {
  // bla: 'test',
}

export default GeneralSettings
