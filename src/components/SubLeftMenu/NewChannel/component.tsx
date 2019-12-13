import React, { ReactNode } from 'react'
import { NewChannel } from '@/components/forms'
import { Wrapper } from './styles'

type INewGroup = {
  handleNext: void;
  children: ReactNode;
}
const NewGroup = (props: INewGroup): ReactNode => {
  return (
    <Wrapper>
      <NewChannel
        openChat={props.openChat}
        changeView={props.changeView}
        nextButtonRef={props.nextButtonRef}/>
    </Wrapper>
  )
}

export default NewGroup
