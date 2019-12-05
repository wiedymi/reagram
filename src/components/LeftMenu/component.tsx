import React, { ReactNode, useState } from 'react'
import { Menu as FabMenu } from '@material-ui/core'
import { PersonOutlined, PeopleOutline, ArrowForward } from '@material-ui/icons'
import { Wrapper, Fab, AddIcon, MenuItem, CloseIcon, ChannelIcon, IconWrapper } from './styles'
import { Menu, Chats, NewGroup, NewChannel, Settings, Contacts } from './subcomponents'
import { useTelegram, USE_TELEGRAM, createIsInView } from '@/helpers'
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
    [LEFT_MENU.NEW_CHANNEL]: NewChannel,
    [LEFT_MENU.SETTINGS]: Settings,
    [LEFT_MENU.CONTACTS]: Contacts,
  }

  const View = views[props.view]

  return <View {...props} />
}

const options = [
  {
    title: 'New Channel',
    icon: ChannelIcon,
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
    <Wrapper>
      <Menu changeView={changeView} view={view} />
      <Views view={view} me={data} />
      {isFabView(view) && (
        <>
          <Fab color="primary" aria-label="add" aria-haspopup="true" onClick={openFab}>
            {fabEl ? <CloseIcon /> : view === LEFT_MENU.CHATS && <AddIcon />}
            {view !== LEFT_MENU.CHATS && <ArrowForward />}
          </Fab>
          <FabMenu
            id="fab-menu"
            anchorEl={fabEl}
            keepMounted
            open={Boolean(fabEl)}
            onClose={closeFab}
          >
            {options.map(Option => (
              <MenuItem key={Option.title} onClick={(): void => handleClose(Option.view)}>
                <IconWrapper>
                  <Option.icon />
                </IconWrapper>
                {Option.title}
              </MenuItem>
            ))}
          </FabMenu>
        </>
      )}
    </Wrapper>
  )
}

export default LeftMenu
