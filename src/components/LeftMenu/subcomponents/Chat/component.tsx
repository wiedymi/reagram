import React, { ReactNode } from 'react'
import { CardHeader, Avatar } from '@material-ui/core'
import { useTelegram, USE_TELEGRAM, toImage } from '@/helpers'
import { TYPES } from '@/constants'
import { Wrapper, ChatWrapper, ChatHoverable } from './styles'

type ChatsProps = {
  children: ReactNode;
}

type ChatProps = {
  children: ReactNode;
}

const getAvatar = (id, blobs, refetch): string => {
  if (!id) {
    return ''
  }

  const photo = blobs.filter(blob => {
    return blob.id === id
  })

  if (photo.length === 0) {
    return refetch()
  }

  const [source] = photo

  return toImage(source.blob)
}

const Chat = (props: ChatProps): ReactNode => {
  const query = {
    id: props.photoId,
    type: TYPES.FILES.PHOTO,
  }
  const { data, loading, refetch, storage } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)

  const avatar = !loading && data ? getAvatar(props.photoId, data.files, refetch) : ''
  const openChat = async (): void => {
    console.log(query)
    console.log(storage.getState())
  }
  return (
    <ChatWrapper>
      <ChatHoverable onClick={openChat}>
        <CardHeader
          avatar={
            loading ? (
              <Avatar aria-label="recipe">{props.title.charAt(0).toUpperCase()}</Avatar>
            ) : (
              <Avatar aria-label="recipe" src={avatar} />
            )
          }
          title={props.title}
          subheader={props.lastMessage._}/>
      </ChatHoverable>
    </ChatWrapper>
  )
}

const Chats = (): ReactNode => {
  const { data, loading } = useTelegram(USE_TELEGRAM.GET_LIST_OF_CHATS)

  if (loading) {
    return <Wrapper>Loading chats...</Wrapper>
  }

  return (
    <Wrapper>
      {data.map(chat => (
        <Chat key={chat.id} {...chat} />
      ))}
    </Wrapper>
  )
}

Chat.defaultProps = {
  // bla: 'test',
}

export default Chats
