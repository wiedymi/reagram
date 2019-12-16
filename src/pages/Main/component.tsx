import React, { ReactNode, useState } from 'react'
import { Layout } from '@/components/common'
import { MiddleMenu, RightMenu, LeftMenu } from '@/menus'
import { Wrapper } from './styles'

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
