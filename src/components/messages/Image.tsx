import React, { ReactNode } from 'react'
import { getImageFile, convertTime } from '@/helpers'
import { getAvatar } from '@/telegram/hooks'
import { TYPES } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

type IImageMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

const chooseImage = (sizes): object => {
  let photo = sizes.filter(size => {
    return size.width > 140
  })

  if (photo.length === 0) {
    photo = sizes
  }

  const [
    {
      height,
      width,
      photo: { id },
    },
  ] = photo

  return { id, height, width }
}
export const ImageMessage = ({ message, me, index }: IImageMessage): ReactNode => {
  const { id, height, width } = chooseImage(message.content.photo.sizes)
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
    priority: index + 1,
  }
  const { data, loading, refetch } = getAvatar(query)
  const caption = message.content.caption.text || ''
  const messageText = caption.length > 0 ? caption : false

  if (loading) {
    return (
      <S.MessageBubble
        isMe={message.senderUserId === me.id}
        height={height}
        withoutText={!messageText}
      >
        <S.LoadingWrapper width={width} height={height}>
          <C.Loading width={width} height={height} />
          {messageText && <S.Message width={width}>{messageText}</S.Message>}
          <S.Status>
            <S.Date image withoutText={!messageText}>
              {convertTime(message.date)}
            </S.Date>
          </S.Status>
        </S.LoadingWrapper>
      </S.MessageBubble>
    )
  }

  const photo = !loading && data ? getImageFile(id, data.files, refetch) : ''

  return (
    <S.MessageBubble
      isMe={message.senderUserId === me.id}
      height={height}
      withoutText={!messageText}
    >
      <S.Image src={photo} width={width} height={height} withoutText={messageText} />
      {messageText && <S.Message width={width}>{messageText}</S.Message>}
      <S.Status>
        <S.Date image withoutText={!messageText}>
          {convertTime(message.date)}
        </S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
