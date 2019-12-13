import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import { getListOfChats } from '@/telegram/hooks'
import Chat from '../Chat'

import * as S from './styles'

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

const Chats = ({ me, ...props }: ChatsProps): ReactNode => {
  const { data, loading } = getListOfChats(999)

  if (loading) {
    return <C.Loading message="Loading chats..." />
  }

  const { pinned, chats } = separateChats(data)

  return (
    <S.Wrapper>
      {hasValues(pinned) &&
        pinned.map(chat => (
          <Chat
            key={chat.id}
            {...chat}
            me={me}
            pinned
            openChat={props.openChat}
            openedChat={props.openedChat}/>
        ))}
      {hasValues(pinned) && <S.PinnedLine />}
      {hasValues(chats) && (
        <S.ChatsSroll>
          {chats.map(chat => (
            <Chat
              key={chat.id}
              {...chat}
              me={me}
              openChat={props.openChat}
              openedChat={props.openedChat}/>
          ))}
        </S.ChatsSroll>
      )}
    </S.Wrapper>
  )
}

export default Chats
