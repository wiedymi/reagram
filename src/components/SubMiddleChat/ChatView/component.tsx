import React, { ReactNode } from 'react'
import { handleMessage } from '@/helpers'
import { TYPES } from '@/constants'
import * as M from '@/components/messages'
import * as S from './styles'

const { PHOTO, TEXT, AUDIO, STICKER, VIDEO, ANIMATION, UNSUPPORTED } = TYPES.MESSAGES

type Props = {
  children: ReactNode
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
    [PHOTO]: M.ImageMessage,
    [TEXT]: M.TextMessage,
    [AUDIO]: M.AudioMessage,
    [STICKER]: M.StickerMessage,
    [VIDEO]: M.VideoMessage,
    [ANIMATION]: M.AnimationMessage,
    [UNSUPPORTED]: M.TextMessage,
  }

  if (type === UNSUPPORTED) {
    console.log(UNSUPPORTED, props)
    return <M.TextMessage {...unsupported} />
  }

  const Result = types[type]

  return <Result key={props.message.id} {...props} />
}

const ChatView = ({ messages, me, openChat, chatInfo }: Props): ReactNode => {
  const toBottom = (node): void => {
    if (node) {
      node.scrollTop = node.scrollHeight - node.clientHeight
    }
  }

  return (
    <S.Wrapper messages={messages.length} ref={toBottom}>
      <S.MessagesWrapper ref={toBottom}>
        {messages.map((message, index) => {
          const type = handleMessage(message.content)

          return chooseMessageView(type, {
            message,
            me,
            index: messages.length - index,
            openChat,
            chatInfo,
          })
        })}
      </S.MessagesWrapper>
    </S.Wrapper>
  )
}

export default ChatView
