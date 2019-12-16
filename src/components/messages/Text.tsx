import React, { ReactNode } from 'react'
import { convertTime } from '@/helpers'
import UserInfo from './UserInfo'
import * as S from './styles'

type ITextMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

export const TextMessage = ({ message, me, openChat, chatInfo }: ITextMessage): ReactNode => {
  const isMe = message.senderUserId === me.id

  // const isPrivate = chatInfo.type._ === 'chatTypePrivate'

  return (
    <S.MessageBubble isMe={isMe}>
      {/* {!isMe && <UserInfo user={message.user} openChat={openChat} />} */}
      <S.Message>{message.content.text.text}</S.Message>
      <S.Status>
        <S.Date>{convertTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
