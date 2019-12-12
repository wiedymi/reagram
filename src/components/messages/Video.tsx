import React, { ReactNode } from 'react'
import { convertTime } from '@/helpers'
import * as S from './styles'

type IVideoMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

export const VideoMessage = ({ message, me }: IVideoMessage): ReactNode => {
  return (
    <S.MessageBubble isMe={message.senderUserId === me.id}>
      <S.Message>Video or GIF</S.Message>
      <S.Status>
        <S.Date>{convertTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
