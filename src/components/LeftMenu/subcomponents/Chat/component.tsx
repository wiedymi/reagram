import React, { ReactNode, useState } from 'react'
import { Card, CardHeader, Avatar } from '@material-ui/core'
import { CollectionsBookmarkOutlined } from '@material-ui/icons'
import { useTelegram, USE_TELEGRAM, toImage } from '@/helpers'
import { TYPES } from '@/constants'
import { Wrapper, ChatWrapper, ChatHoverable } from './styles'

type ChatsProps = {
  children: ReactNode
}

type ChatProps = {
  children: ReactNode
}

const getAvatar = (id, blobs, refetch) => {
  if (!id) {
    return ''
  }

  const photo = blobs.filter(blob => {
    return blob.id === id
  })

  if (photo.length === 0) {
    return refetch()
  }

  const { blob } = photo[0]

  return toImage(blob)
}

const Chat = (props: ChatProps) => {
  const query = {
    id: props.photoId,
    type: TYPES.FILES.PHOTO,
  }
  const { data, loading, refetch } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)

  const avatar = !loading && data ? getAvatar(props.photoId, data.blobs, refetch) : ''

  return (
    <ChatWrapper>
      <ChatHoverable>
        <CardHeader
          avatar={
            loading ? (
              <Avatar aria-label="recipe">{props.title.charAt(0).toUpperCase()}</Avatar>
            ) : (
              <Avatar aria-label="recipe" src={avatar} />
            )
          }
          title={props.title}
          subheader={props.lastMessage._}
        />
      </ChatHoverable>
    </ChatWrapper>
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
