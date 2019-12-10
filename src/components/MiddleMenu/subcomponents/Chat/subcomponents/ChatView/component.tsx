import React, { ReactNode, useRef } from 'react'
import { handleMessage, getImageFile, useTelegram, USE_TELEGRAM } from '@/helpers'
import { TYPES } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

const { PHOTO, TEXT, AUDIO, STICKER, VIDIO, UNSUPPORTED } = TYPES.MESSAGES

type Props = {
  children: ReactNode;
}

const getTime = (time): string => {
  const date = new Date(+`${time}000`)

  return `${date.getHours()}:${date.getMinutes()}`
}

const TextMessage = ({ message, me }: ITextMessage): ReactNode => {
  return (
    <S.MessageBubble isMe={message.senderUserId === me.id}>
      <S.Message>{message.content.text.text}</S.Message>
      <S.Status>
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}

const ImageMessage = ({ message, me, index }: IImageMessage): ReactNode => {
  const { id } = message.content.photo.sizes[0].photo
  const [{ height, width }] = message.content.photo.sizes
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
    priority: index + 1,
  }
  const { data, loading, refetch } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)
  const caption = message.content.caption.text || ''
  const messageText = caption.length > 0 ? caption : false

  if (loading) {
    return (
      <S.MessageBubble isMe={message.senderUserId === me.id}>
        <S.LoadingWrapper width={width} height={height}>
          <C.Loading message="Dowloading photo..." />
          {messageText && <S.Message width={width}>{messageText}</S.Message>}
        </S.LoadingWrapper>
      </S.MessageBubble>
    )
  }

  const photo = !loading && data ? getImageFile(id, data.files, refetch) : ''

  return (
    <S.MessageBubble isMe={message.senderUserId === me.id}>
      <S.Image src={photo} width={width} height={height} />
      {messageText && <S.Message width={width}>{messageText}</S.Message>}
      <S.Status>
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}

const AudioMessage = ({ message, me }: IAudioMessage): ReactNode => {
  return (
    <S.MessageBubble isMe={message.senderUserId === me.id}>
      <S.Status>
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}

const VideoMessage = ({ message, time, isMe }: IVideoMessage): ReactNode => {
  return (
    <S.MessageBubble isMe={isMe}>
      <S.Message>{message}</S.Message>
      <S.Status>
        <S.Date>{getTime(time)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}

const StickerMessage = ({ message, me }: IStickerMessage): ReactNode => {
  console.log(message)
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
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}

const chooseMessageView = (type, props): ReactNode => {
  const unsupported = {
    message: {
      senderUserId: 1,
      content: {
        text: {
          text: 'Unsupported message',
        },
      },
      date: Date.now(),
    },
    me: {
      id: 1,
    },
  }

  const types = {
    [PHOTO]: ImageMessage,
    [TEXT]: TextMessage,
    [AUDIO]: AudioMessage,
    [STICKER]: StickerMessage,
    // [VIDIO]: VideoMessage,
    [UNSUPPORTED]: TextMessage,
  }

  if (!types[type]) {
    console.log(UNSUPPORTED, props)
    return <TextMessage {...unsupported} />
  }

  const Result = types[type]

  return type !== UNSUPPORTED ? <Result {...props} /> : <TextMessage {...unsupported} />
}

const ChatView = ({ messages, me }: Props): ReactNode => {
  const messageBody = useRef()
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight

  return (
    <S.Wrapper messages={messages.length} ref={messageBody}>
      <S.MessagesWrapper>
        {messages.reverse().map((message, index) => {
          const type = handleMessage(message.content)
          messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
          return chooseMessageView(type, { message, me, index })
        })}
      </S.MessagesWrapper>
    </S.Wrapper>
  )
}

export default ChatView
