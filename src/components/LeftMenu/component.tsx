import React, { ReactNode, useState } from 'react'
import { Wrapper } from './styles'
import { Menu, Chats, NewGroup } from './subcomponents'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import { LEFT_MENU } from '@/constants'

const { GET_ME } = USE_TELEGRAM

type ViewType = {
  view: string;
  me: object;
}

const Views = (props: ViewType): ReactNode => {
  const views = {
    [LEFT_MENU.CHATS]: Chats,
    [LEFT_MENU.NEW_GROUP]: NewGroup,
  }

  const View = views[props.view]

  return <View {...props} />
}

const LeftMenu = (): ReactNode => {
  const { data } = useTelegram(GET_ME)
  const [view, changeView] = useState(LEFT_MENU.CHATS)

  return (
    <Wrapper>
      <Menu changeView={changeView} view={view} />
      <Views view={view} me={data} />
    </Wrapper>
  )
}
LeftMenu.defaultProps = {
  // bla: 'test',
}

export default LeftMenu
