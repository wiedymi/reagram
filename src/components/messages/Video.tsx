import React, { ReactNode } from 'react'
import * as S from './styles'

type IVideoMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

const getTime = (time): string => {
  const date = new Date(+`${time}000`)

  return `${date.getHours()}:${date.getMinutes()}`
}

export const VideoMessage = ({ message, me }: IVideoMessage): ReactNode => {
  return (
    <S.MessageBubble isMe={message.senderUserId === me.id}>
      <S.Message>Video or GIF</S.Message>
      <S.Status>
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
