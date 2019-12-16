import React, { ReactNode } from 'react'
import { getImageFile, convertTime } from '@/helpers'
import { getAvatar } from '@/telegram/hooks'
import { TYPES } from '@/constants'
import * as S from './styles'

type IStickerMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

export const StickerMessage = ({ message, me }: IStickerMessage): ReactNode => {
  const { id } = message.content.sticker.sticker
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
    priority: 3,
  }

  const { data, loading, refetch } = getAvatar(query)

  const sticker =
    !loading && data ? getImageFile(id, data.files, refetch) : message.content.sticker.emoji

  return (
    <S.MessageBubble isMe={message.senderUserId === me.id} sticker>
      <S.Image src={sticker} width={240} height={280} />
      <S.Status>
        <S.Date image withoutText={true}>
          {convertTime(message.date)}
        </S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
