import React, { ReactNode } from 'react'
import { getAvatar } from '@/telegram/hooks'
import { getImageFile, handleChats, nFormatter } from '@/helpers'
import { TYPES } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

type IChatInfo = {
  children: ReactNode
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
    </S.Wrapper>
  )
}

export default ChatInfo
