import React, { ReactNode, useState, useCallback } from 'react'
import { Layout } from '@/components/common'
import { MiddleMenu, RightMenu, LeftMenu } from '@/components/menus'
import { Wrapper } from './styles'

const Main = (): ReactNode => {
  const [openedChat, setOpenedChat] = useState(0)
  const [hidden, setHidden] = useState(null)
  const toggleRightMenu = useCallback(() => {
    setHidden(!hidden)
  }, [hidden, setHidden])

  const props = {
    openedChat: openedChat,
    openChat: setOpenedChat,
    hidden,
    toggleRightMenu,
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
