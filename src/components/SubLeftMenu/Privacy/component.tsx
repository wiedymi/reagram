import React, { ReactNode } from 'react'
import { Wrapper } from './styles'

type IPrivacy = {
  children: ReactNode;
}

const Privacy = (props: IPrivacy): ReactNode => <Wrapper>Privacy context</Wrapper>

export default Privacy
