import React, { ReactNode, useState } from 'react'
import { Menu, InputAdornment, IconButton } from '@material-ui/core'
import {
  HelpOutline,
  ArrowBack,
  Menu as MenuIcon,
  PersonOutlined,
  ArchiveOutlined,
  TurnedInNot,
  SettingsOutlined,
  PeopleOutline,
  Search,
  ExitToApp,
  MoreVert,
} from '@material-ui/icons'
import { Wrapper, IconWrapper, MenuItem, LeftNav, RightNav, Input, Title } from './styles'
import { LEFT_MENU } from '@/constants'
import { createIsInView, telegram } from '@/helpers'

type Props = {
  children: ReactNode;
}

const options = [
  {
    title: 'New Group',
    icon: PeopleOutline,
    view: LEFT_MENU.NEW_GROUP,
  },
  {
    title: 'Contacts',
    icon: PersonOutlined,
    view: LEFT_MENU.CONTACTS,
  },
  {
    title: 'Archived',
    icon: ArchiveOutlined,
    view: LEFT_MENU.ARCHIVED,
  },
  {
    title: 'Saved',
    icon: TurnedInNot,
    view: LEFT_MENU.SAVED,
  },
  {
    title: 'Settings',
    icon: SettingsOutlined,
    view: LEFT_MENU.SETTING,
  },
  {
    title: 'Help',
    icon: HelpOutline,
    view: LEFT_MENU.HELP,
  },
]

const ITEM_HEIGHT = 48

const objToArrayOfString = (object): Array<string> => {
  return Object.entries(object).reduce((acc, val) => [...acc, val[1]], [])
}

const isInGroup = createIsInView([LEFT_MENU.NEW_GROUP])
const isInSettings = createIsInView([LEFT_MENU.SETTING])
const isInSettingsOpts = createIsInView(objToArrayOfString(LEFT_MENU.SETTINGS))
const isInChats = createIsInView([LEFT_MENU.CHATS])
const isInChannel = createIsInView([LEFT_MENU.NEW_CHANNEL])
const isInContacts = createIsInView([LEFT_MENU.CONTACTS])

const showSettingsOpts = (view): ReactNode => {
  const shows = {
    [LEFT_MENU.SETTINGS.EDIT]: <Title variant="h6">Edit Profile</Title>,
    [LEFT_MENU.SETTINGS.GENERAL]: <Title variant="h6">General</Title>,
    [LEFT_MENU.SETTINGS.NOTIFICATIONS]: <Title variant="h6">Notifications</Title>,
    [LEFT_MENU.SETTINGS.PRIVACY]: <Title variant="h6">Privacy and Security</Title>,
    [LEFT_MENU.SETTINGS.LANGUAGE]: <Title variant="h6">Language</Title>,
  }

  return shows[view]
}

const MenuNav = ({ changeView, view }: MenuNavType): ReactNode => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [settingEl, setSettingEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openSetting = Boolean(settingEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (isInSettingsOpts(view)) {
      return changeView(LEFT_MENU.SETTING)
    }
    if (!isInChats(view)) {
      return changeView(LEFT_MENU.CHATS)
    }

    setAnchorEl(event.currentTarget)
  }

  const handleClickSetting = (event: React.MouseEvent<HTMLElement>): void => {
    setSettingEl(event.currentTarget)
  }

  const handleClose = (value): void => {
    if (typeof value === 'string') {
      changeView(value)
    }

    setAnchorEl(null)
  }

  const handleCloseSetting = (): void => {
    setSettingEl(null)
  }

  const logout = async (): void => {
    await telegram.logout()
  }

  return (
    <Wrapper>
      <LeftNav>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {!isInChats(view) ? <ArrowBack /> : <MenuIcon />}
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(Option => (
            <MenuItem key={Option.title} onClick={() => handleClose(Option.view)}>
              <IconWrapper>
                <Option.icon />
              </IconWrapper>
              {Option.title}
            </MenuItem>
          ))}
        </Menu>
      </LeftNav>
      <RightNav view={view}>
        {isInGroup(view) && <Title variant="h6">New Group</Title>}
        {isInChannel(view) && <Title variant="h6">New Channel</Title>}
        {isInContacts(view) && (
          <Input
            id="outlined-basic"
            placeholder="Search"
            variant="outlined"
            size="tiny"
            startAdornment={
              <InputAdornment position="start">
                <Search color="#ccc" />
              </InputAdornment>
            }/>
        )}
        {isInSettingsOpts(view) && showSettingsOpts(view)}
        {isInSettings(view) && (
          <>
            <Title variant="h6">Settings</Title>
            <IconButton
              aria-label="setting-more"
              aria-controls="setting-menu"
              aria-haspopup="true"
              onClick={handleClickSetting}
            >
              <MoreVert onClick={handleClickSetting} />
            </IconButton>
            <Menu
              id="setting-menu"
              anchorEl={settingEl}
              keepMounted
              open={openSetting}
              onClose={handleCloseSetting}
            >
              <MenuItem onClick={logout}>
                <IconWrapper>
                  <ExitToApp />
                </IconWrapper>
                Log out
              </MenuItem>
            </Menu>
          </>
        )}
        {isInChats(view) && (
          <Input
            id="outlined-basic"
            placeholder="Search"
            variant="outlined"
            size="tiny"
            startAdornment={
              <InputAdornment position="start">
                <Search color="#ccc" />
              </InputAdornment>
            }/>
        )}
      </RightNav>
    </Wrapper>
  )
}

export default MenuNav
