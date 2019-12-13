import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import * as Sub from '@/components/SubMiddleChat'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import * as S from './styles'

const { GET_CHAT_MESSAGES } = USE_TELEGRAM

type IChat = {
  children: ReactNode;
  openedChat: number;
  openChat: VoidFunction;
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

const Chat = (props: IChat): ReactNode => {
  const { data, loading, refetch, storage } = useTelegram(GET_CHAT_MESSAGES, {
    chatId: props.openedChat,
    offset: 0,
    limit: 30,
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
      <Sub.Menu chatInfo={chatInfo} openChat={props.openChat} />
      <S.ChatWrapper>
        <Sub.ChatView messages={messages} chatInfo={chatInfo} me={me} openChat={props.openChat} />
        {!chatInfo.type.isChannel && <Sub.ChatController chatId={props.openedChat} />}
      </S.ChatWrapper>
    </S.Wrapper>
  )
}

export default Chat
