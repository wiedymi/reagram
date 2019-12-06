import React, { ReactNode, useState } from 'react'
import { Menu as FabMenu } from '@material-ui/core'
import { PersonOutlined, PeopleOutline, ArrowForward } from '@material-ui/icons'
import { useTelegram, USE_TELEGRAM, createIsInView } from '@/helpers'
import { LEFT_MENU } from '@/constants'

import * as S from './styles'
import * as Sub from './subcomponents'

const { GET_ME } = USE_TELEGRAM

type ViewType = {
  view: string;
  me: object;
}

const Views = (props: ViewType): ReactNode => {
  const views = {
    [LEFT_MENU.CHATS]: Sub.Chats,
    [LEFT_MENU.NEW_GROUP]: Sub.NewGroup,
    [LEFT_MENU.NEW_CHANNEL]: Sub.NewChannel,
    [LEFT_MENU.SETTING]: Sub.Settings,
    [LEFT_MENU.CONTACTS]: Sub.Contacts,
    [LEFT_MENU.SETTINGS.EDIT]: Sub.EditProfile,
    [LEFT_MENU.SETTINGS.GENERAL]: Sub.GeneralSettings,
    [LEFT_MENU.SETTINGS.NOTIFICATIONS]: Sub.Notifications,
    [LEFT_MENU.SETTINGS.PRIVACY]: Sub.Privacy,
    [LEFT_MENU.SETTINGS.LANGUAGE]: Sub.Language,
  }

  const View = views[props.view]

  return <View {...props} />
}

const options = [
  {
    title: 'New Channel',
    icon: S.ChannelIcon,
    view: LEFT_MENU.NEW_CHANNEL,
  },
  {
    title: 'New Group',
    icon: PeopleOutline,
    view: LEFT_MENU.NEW_GROUP,
  },
  {
    title: 'New Private Chat',
    icon: PersonOutlined,
    view: LEFT_MENU.NEW_PRIVATE_CHAT,
  },
]

const isFabView = createIsInView([
  LEFT_MENU.CHATS,
  LEFT_MENU.NEW_CHANNEL,
  LEFT_MENU.NEW_GROUP,
  LEFT_MENU.NEW_PRIVATE_CHAT,
  LEFT_MENU.SETTINGS.EDIT,
])

const LeftMenu = (): ReactNode => {
  const { data } = useTelegram(GET_ME)
  const [view, changeView] = useState(LEFT_MENU.CHATS)

  const [fabEl, setFabEl] = useState<null | HTMLElement>(null)

  const openFab = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setFabEl(event.currentTarget)
  }

  const closeFab = (): void => {
    setFabEl(null)
  }

  const handleClose = (value): void => {
    if (typeof value === 'string') {
      changeView(value)
    }

    setFabEl(null)
  }

  return (
    <S.Wrapper>
      <Sub.Menu changeView={changeView} view={view} />
      <Views view={view} me={data} changeView={changeView} />
      {isFabView(view) && (
        <>
          <S.Fab color="primary" aria-label="add" aria-haspopup="true" onClick={openFab}>
            {fabEl ? <S.CloseIcon /> : view === LEFT_MENU.CHATS && <S.AddIcon />}
            {view !== LEFT_MENU.CHATS && <ArrowForward />}
          </S.Fab>
          <FabMenu
            id="fab-menu"
            anchorEl={fabEl}
            keepMounted
            open={Boolean(fabEl)}
            onClose={closeFab}
          >
            {options.map(Option => (
              <S.MenuItem key={Option.title} onClick={(): void => handleClose(Option.view)}>
                <S.IconWrapper>
                  <Option.icon />
                </S.IconWrapper>
                {Option.title}
              </S.MenuItem>
            ))}
          </FabMenu>
        </>
      )}
    </S.Wrapper>
  )
}

export default LeftMenu
