import React, { ReactNode, useState } from 'react'
import { Menu, InputAdornment, IconButton } from '@material-ui/core'
import {
  HelpOutline,
  Menu as MenuIcon,
  PersonOutlined,
  ArchiveOutlined,
  TurnedInNot,
  SettingsOutlined,
  PeopleOutline,
  Search,
} from '@material-ui/icons'
import { Wrapper, IconWrapper, MenuItem, LeftNav, RightNav, Input } from './styles'

type Props = {
  children: ReactNode;
}

const options = [
  {
    title: 'New Group',
    icon: PeopleOutline,
  },
  {
    title: 'Contacts',
    icon: PersonOutlined,
  },
  {
    title: 'Atchived',
    icon: ArchiveOutlined,
  },
  {
    title: 'Saved',
    icon: TurnedInNot,
  },
  {
    title: 'Setting',
    icon: SettingsOutlined,
  },
  {
    title: 'Help',
    icon: HelpOutline,
  },
]

const ITEM_HEIGHT = 48

const MenuNav = (): ReactNode => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
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
          <MenuIcon />
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
            <MenuItem key={Option.title} onClick={handleClose}>
              <IconWrapper>
                <Option.icon />
              </IconWrapper>
              {Option.title}
            </MenuItem>
          ))}
        </Menu>
      </LeftNav>
      <RightNav>
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
      </RightNav>
    </Wrapper>
  )
}

MenuNav.defaultProps = {
  // bla: 'test',
}

export default MenuNav
