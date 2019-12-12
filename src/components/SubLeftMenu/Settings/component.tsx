import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import { useTelegram, USE_TELEGRAM, getImageFile } from '@/helpers'
import { TYPES, LEFT_MENU } from '@/constants'
import * as S from './styles'

const { GET_AVATARS_CHATS } = USE_TELEGRAM

type Props = {
  children: ReactNode
}

const options = [
  {
    text: 'Edit Profile',
    icon: '/icons/edit_svg.svg',
    view: LEFT_MENU.SETTINGS.EDIT,
  },
  {
    text: 'General Settings',
    icon: '/icons/settings_svg.svg',
    view: LEFT_MENU.SETTINGS.GENERAL,
  },
  {
    text: 'Notifications',
    icon: '/icons/unmute_svg.svg',
    view: LEFT_MENU.SETTINGS.NOTIFICATIONS,
  },
  {
    text: 'Privacy and Security',
    icon: '/icons/lock_svg.svg',
    view: LEFT_MENU.SETTINGS.PRIVACY,
  },
  {
    text: 'Language',
    icon: '/icons/language_svg.svg',
    view: LEFT_MENU.SETTINGS.LANGUAGE,
  },
]

const Settings = (props: Props): ReactNode => {
  const { id } = props.me.profilePhoto.big
  const { firstName, phoneNumber, lastName } = props.me
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
  }
  const { loading, data, refetch } = useTelegram(GET_AVATARS_CHATS, query)

  const image = !loading && data ? getImageFile(id, data.files, refetch) : ''

  if (loading) {
    return <C.Loading message="Loading settings..." />
  }

  const handleClick = (VIEW: string): void => {
    props.changeView(VIEW)
  }

  return (
    <S.Wrapper>
      <C.SelectImage hidden image={image} />
      <S.Title variant="h5">{!lastName ? firstName : firstName + ' ' + lastName}</S.Title>
      <S.Subtitle>+{phoneNumber}</S.Subtitle>
      <S.Menu>
        {options.map(opt => (
          <S.Hoverable
            key={opt.icon}
            onClick={(e): void => {
              // S.hoverableClick(e)
              handleClick(opt.view)
            }}>
            <S.Option>
              <S.Icon src={opt.icon} sizeIcon="40px" />
              <S.Text>{opt.text}</S.Text>
            </S.Option>
          </S.Hoverable>
        ))}
      </S.Menu>
    </S.Wrapper>
  )
}

export default Settings
