import React, { ReactNode } from 'react'
import * as S from '../styles'

type ITextMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

const getTime = (time): string => {
  const date = new Date(+`${time}000`)

  return `${date.getHours()}:${date.getMinutes()}`
}

export const TextMessage = ({ message, me }: ITextMessage): ReactNode => {
  return (
    <S.MessageBubble isMe={message.senderUserId === me.id}>
      <S.Message>{message.content.text.text}</S.Message>
      <S.Status>
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
