import React, { ReactNode } from 'react'
import { Wrapper, Loading, Message } from './styles'

type Props = {
  children: ReactNode;
  message: string;
  error: boolean;
}

const Component = (props: Props): ReactNode => (
  <Wrapper>
    {!props.error && <Loading />}
    <Message>{props.message}</Message>
  </Wrapper>
)

export default Component
