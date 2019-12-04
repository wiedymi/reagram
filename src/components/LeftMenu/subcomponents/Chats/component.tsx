import React, { ReactNode } from 'react'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import Chat from '../Chat'

import { Wrapper } from './styles'

type ChatsProps = {
  me: object;
  children: ReactNode;
}
const Chats = ({ me }: ChatsProps): ReactNode => {
  const { data, loading } = useTelegram(USE_TELEGRAM.GET_LIST_OF_CHATS, 999)

  if (loading) {
    return <Wrapper>Loading chats...</Wrapper>
  }

  return (
    <Wrapper>
      {data.map(chat => (
        <Chat key={chat.id} {...chat} me={me} />
      ))}
    </Wrapper>
  )
}

Chats.defaultProps = {
  // bla: 'test',
}

export default Chats
