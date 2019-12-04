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
} from '@material-ui/icons'
import { Wrapper, IconWrapper, MenuItem, LeftNav, RightNav, Input, Title } from './styles'
import { LEFT_MENU } from '@/constants'

type Props = {
  children: ReactNode
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
    title: 'Setting',
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

const MenuNav = ({ changeView, view }): ReactNode => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  console.log(view)
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value): void => {
    if (typeof value === 'string') {
      changeView(value)
    }

    setAnchorEl(null)
  }

  return (
    <Wrapper>
      <LeftNav>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={
            view !== LEFT_MENU.CHATS ? (): void => changeView(LEFT_MENU.CHATS) : handleClick
          }>
          {view !== LEFT_MENU.CHATS ? <ArrowBack /> : <MenuIcon />}
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
          }}>
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
      <RightNav>
        {view === LEFT_MENU.NEW_GROUP && <Title variant="h5">New Group</Title>}
        {view === LEFT_MENU.CHATS && (
          <Input
            id="outlined-basic"
            placeholder="Search"
            variant="outlined"
            size="tiny"
            startAdornment={
              <InputAdornment position="start">
                <Search color="#ccc" />
              </InputAdornment>
            }
          />
        )}
      </RightNav>
    </Wrapper>
  )
}

MenuNav.defaultProps = {
  // bla: 'test',
}

export default MenuNav
