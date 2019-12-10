import React, { ReactNode, useState } from 'react'
import { Layout } from '@/components/base'
import LeftMenu from '@/components/LeftMenu'
import { Wrapper } from './styles'
import MiddleMenu from 'components/MiddleMenu'
import RightMenu from 'components/RightMenu'

const Main = (): ReactNode => {
  const [openedChat, setOpenedChat] = useState(0)
  const props = {
    openedChat: openedChat,
    openChat: setOpenedChat,
  }

  return (
    <Layout>
      <Wrapper>
        <LeftMenu {...props} />
        <MiddleMenu {...props} />
        <RightMenu {...props} />
      </Wrapper>
    </Layout>
  )
}

export default Main
