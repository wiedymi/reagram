import React, { ReactNode } from 'react'
import { CardHeader, Avatar } from '@material-ui/core'
import { useTelegram, USE_TELEGRAM, toImage, handleLastMessage } from '@/helpers'
import { TYPES } from '@/constants'
import {
  ChatWrapper,
  ChatHoverable,
  UnreadMessages,
  MessageTime,
  ActionWrapper,
  OnlineBadge,
} from './styles'

type ChatProps = {
  children: ReactNode
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

const getTime = time => {
  const date = new Date(time)

  return `${date.getHours()}:${date.getMinutes()}`
}

const Actions = ({ unreadCount, time }): ReactNode => {
  return (
    <>
      <ActionWrapper>
        <MessageTime>{getTime(time)}</MessageTime>
      </ActionWrapper>
      {unreadCount !== 0 && <UnreadMessages>{unreadCount}</UnreadMessages>}
    </>
  )
}

const Chat = (props: ChatProps): ReactNode => {
  const query = {
    id: props.photoId,
    type: TYPES.FILES.PHOTO,
  }
  const { data, loading, refetch, storage } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)

  let avatar = !loading && data ? getAvatar(props.photoId, data.files, refetch) : ''
  let { title, id } = props
  const openChat = async (): void => {
    console.log(props)
    console.log(storage.getState())
  }
  let isSaved = false
  if (props.me && props.me.firstName && props.title === props.me.firstName) {
    title = 'Saved Messages'
    avatar = '/icons/savedmessages_svg.svg'
    isSaved = true
  }

  let showOnline = false
  if (props.type === 'chatTypePrivate' && !isSaved && id !== 777000) {
    showOnline = true
  }

  return (
    <ChatWrapper>
      <ChatHoverable onClick={openChat} isSaved={isSaved}>
        <CardHeader
          avatar={
            loading ? (
              <Avatar aria-label="recipe">{title.charAt(0).toUpperCase()}</Avatar>
            ) : (
              <OnlineBadge
                overlap="circle"
                variant="dot"
                color="primary"
                anchorOrigin={{
                  horizontal: 'right',
                  vertical: 'bottom',
                }}
                showOnline={showOnline}>
                <Avatar aria-label="recipe" src={avatar} />
              </OnlineBadge>
            )
          }
          title={title}
          subheader={handleLastMessage(props.lastMessage)}
          action={<Actions unreadCount={props.unreadCount} time={props.lastMessage.date} />}
        />
      </ChatHoverable>
    </ChatWrapper>
  )
}

export default Chat
