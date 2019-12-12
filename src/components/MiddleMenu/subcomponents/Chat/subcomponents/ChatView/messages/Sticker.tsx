import React, { ReactNode } from 'react'
import { getImageFile, useTelegram, USE_TELEGRAM } from '@/helpers'
import { TYPES } from '@/constants'
import * as S from '../styles'

type IStickerMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

const getTime = (time): string => {
  const date = new Date(+`${time}000`)

  return `${date.getHours()}:${date.getMinutes()}`
}

export const StickerMessage = ({ message, me }: IStickerMessage): ReactNode => {
  const { id } = message.content.sticker.sticker
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
    priority: 3,
  }

  const { data, loading, refetch } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)

  const sticker =
    !loading && data ? getImageFile(id, data.files, refetch) : message.content.sticker.emoji

  return (
    <S.MessageBubble isMe={message.senderUserId === me.id} sticker>
      <S.Image src={sticker} width={240} height={280} />
      <S.Status>
        <S.Date image withoutText={true}>
          {getTime(message.date)}
        </S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
