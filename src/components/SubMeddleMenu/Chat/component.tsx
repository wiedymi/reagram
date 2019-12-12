import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import * as S from './styles'
import * as Sub from '@/components/SubMiddleChat'

const { GET_CHAT_MESSAGES } = USE_TELEGRAM

type Props = {
  children: ReactNode;
}

const isCorrectChat = (id: number, data: array): boolean => {
  if (data.totalCount === 0 && data.messages.length === 0) {
    return true
  }

  const result = data.messages.filter(chat => {
    return chat.chatId === id
  })

  return result.length !== 0
}

const Chat = (props: Props): ReactNode => {
  const { data, loading, refetch, storage } = useTelegram(GET_CHAT_MESSAGES, {
    chatId: props.openedChat,
    offset: 0,
    limit: 40,
  })

  if (loading) {
    return <C.Loading message="Loading messages" />
  }

  if (!isCorrectChat(props.openedChat, data)) {
    return refetch()
  }

  const { chatInfo, messages } = data
  const { me } = storage.getState()
  return (
    <S.Wrapper>
      <Sub.Menu chatInfo={chatInfo} />
      <Sub.ChatView messages={messages} me={me} />
      <Sub.ChatController chatId={props.openedChat} />
    </S.Wrapper>
  )
}

export default Chat
