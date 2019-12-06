import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import Chat from '../Chat'

import * as S from './styles'

const { GET_LIST_OF_CHATS } = USE_TELEGRAM

type ChatsProps = {
  me: object;
  children: ReactNode;
}

const separateChats = (chats): object => {
  return {
    pinned: chats.filter(chat => {
      return chat.isPinned
    }),
    chats: chats.filter(chat => {
      return !chat.isPinned
    }),
  }
}

const hasValues = (array): boolean => {
  return Array.isArray(array) && array.length > 0
}

const Chats = ({ me }: ChatsProps): ReactNode => {
  const { data, loading } = useTelegram(GET_LIST_OF_CHATS, 999)

  if (loading) {
    return <C.Loading message="Loading chats..." />
  }

  const { pinned, chats } = separateChats(data)

  return (
    <S.Wrapper>
      {hasValues(pinned) && pinned.map(chat => <Chat key={chat.id} {...chat} me={me} pinned />)}
      {hasValues(pinned) && <S.PinnedLine />}
      {hasValues(chats) && chats.map(chat => <Chat key={chat.id} {...chat} me={me} />)}
    </S.Wrapper>
  )
}

Chats.defaultProps = {
  // bla: 'test',
}

export default Chats
