import React, { ReactNode } from 'react'
import { getAvatar } from '@/telegram/hooks'
import { getImageFile, handleChats, nFormatter } from '@/helpers'
import { TYPES } from '@/constants'
import Checkbox from '@material-ui/core/Checkbox'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'
import * as C from '@/components/common'
import * as S from './styles'

type IChatInfo = {
  children: ReactNode
}
const details = (chatInfo: object): Array<object> => {
  const data = []

  if (chatInfo.bio) {
    data.push({
      title: chatInfo.bio,
      subtitle: 'Bio',
      Icon: InfoOutlinedIcon,
    })
  }

  if (chatInfo.username) {
    data.push({
      title: chatInfo.username,
      subtitle: 'Username',
      Icon: AlternateEmailOutlinedIcon,
    })
  }

  if (chatInfo.mobilePhone) {
    data.push({
      title: chatInfo.mobilePhone,
      subtitle: 'Mobile phone',
      Icon: CallOutlinedIcon,
    })
  }

  if (chatInfo.description) {
    data.push({
      title: chatInfo.description,
      subtitle: 'About',
      Icon: InfoOutlinedIcon,
    })
  }

  if (chatInfo.inviteLink) {
    data.push({
      title: chatInfo.inviteLink,
      subtitle: 'Link',
      Icon: AlternateEmailOutlinedIcon,
    })
  }

  data.push({
    title: 'Notifications',
    subtitle: 'Disabled',
    Icon: function NotificationsCheckbox() {
      return (
        <Checkbox
          defaultChecked
          value="uncontrolled"
          color="primary"
          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
        />
      )
    },
  })

  return data
}

const ChatInfo = ({ chatInfo }: IChatInfo): ReactNode => {
  console.log(chatInfo)
  let image
  if (chatInfo.photo) {
    const { id } = chatInfo.photo.big
    const query = {
      id,
      type: TYPES.FILES.PHOTO,
    }
    const { loading, data, refetch } = getAvatar(query)

    image = !loading && data ? getImageFile(id, data.files, refetch) : ''

    if (loading) {
      return <C.Loading message="Loading settings..." />
    }
  }

  const type = handleChats(chatInfo) === TYPES.CHATS.CHANNEL
  const isChat = handleChats(chatInfo) === TYPES.CHATS.SUPERGROUP
  return (
    <S.Wrapper>
      {!chatInfo.photo ? (
        <S.Circle text={chatInfo.title.charAt(0).toUpperCase()} />
      ) : (
        <S.Circle image={image} />
      )}
      <S.Title>{chatInfo.title}</S.Title>
      <S.Subtitle type={type}>
        {type
          ? nFormatter(chatInfo.memberCount) + ` ${isChat ? 'members' : 'subscibers'}`
          : 'Online'}
      </S.Subtitle>
      <S.Details>
        {details(chatInfo).map(
          ({ title, subtitle, Icon }, i): ReactNode => {
            return (
              <S.Detail key={i}>
                <Icon />
                <S.DetailInfo>
                  <S.DetailTitle>{title}</S.DetailTitle>
                  <S.DetailSubtitle>{subtitle}</S.DetailSubtitle>
                </S.DetailInfo>
              </S.Detail>
            )
          },
        )}
      </S.Details>
    </S.Wrapper>
  )
}

export default ChatInfo
