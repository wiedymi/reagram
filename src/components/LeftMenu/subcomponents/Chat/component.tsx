import React, { ReactNode, useState } from 'react'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import { Wrapper } from './styles'

type ChatsProps = {
  children: ReactNode
}

type ChatProps = {
  children: ReactNode
}

const Chat = (props: ChatProps) => {
  console.log(props)
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  )
}

const Chats = (props: ChatsProps) => {
  const { data, loading } = useTelegram(USE_TELEGRAM.GET_LIST_OF_CHATS)

  if (loading) {
    return <Wrapper>Loading chats...</Wrapper>
  }

  return (
    <Wrapper>
      {data.map(chat => (
        <Chat {...chat} />
      ))}
    </Wrapper>
  )
}

Chat.defaultProps = {
  // bla: 'test',
}

export default Chats
