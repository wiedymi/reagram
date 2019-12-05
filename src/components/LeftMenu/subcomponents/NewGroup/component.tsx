import React, { ReactNode } from 'react'
import { CreateGroup } from '@/components/forms'
import { Wrapper } from './styles'

const NewGroup = (): ReactNode => {
  return (
    <Wrapper>
      <CreateGroup />
    </Wrapper>
  )
}

export default NewGroup
