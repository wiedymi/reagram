import React, { ReactNode } from 'react'
import { Loading } from '@/components/common'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import Chat from '../Chat'

import { Wrapper, PinnedLine } from './styles'

const { GET_LIST_OF_CHATS } = USE_TELEGRAM

type ChatsProps = {
  me: object
  children: ReactNode
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
    return <Loading message="Loading chats..." />
  }

  const { pinned, chats } = separateChats(data)

  return (
    <Wrapper>
      {hasValues(pinned) && pinned.map(chat => <Chat key={chat.id} {...chat} me={me} pinned />)}
      {hasValues(pinned) && <PinnedLine />}
      {hasValues(chats) && chats.map(chat => <Chat key={chat.id} {...chat} me={me} />)}
    </Wrapper>
  )
}

Chats.defaultProps = {
  // bla: 'test',
}

export default Chats
