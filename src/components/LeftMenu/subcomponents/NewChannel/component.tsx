import React, { ReactNode } from 'react'
import { NewChannel } from '@/components/forms'
import { Wrapper } from './styles'

const NewGroup = (): ReactNode => {
  return (
    <Wrapper>
      <NewChannel />
    </Wrapper>
  )
}

export default NewGroup
