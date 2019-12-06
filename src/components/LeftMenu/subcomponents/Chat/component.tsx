import React, { ReactNode } from 'react'
import { CardHeader, Avatar } from '@material-ui/core'
import { useTelegram, USE_TELEGRAM, handleLastMessage, getImageFile } from '@/helpers'
import { TYPES } from '@/constants'
import {
  ChatWrapper,
  ChatHoverable,
  UnreadMessages,
  MessageTime,
  ActionWrapper,
  OnlineBadge,
  PinnedMessage,
} from './styles'

type ChatProps = {
  children: ReactNode
}

const getTime = (time): string => {
  const date = new Date(time)

  return `${date.getHours()}:${date.getMinutes()}`
}

const isPinned = (unread: Any, pinned: boolean): boolean => {
  console.log(!unread && pinned, unread, pinned)
  return !unread && pinned
}

const Actions = ({ unreadCount, time, pinned }: ActionsType): ReactNode => {
  return (
    <>
      <ActionWrapper>
        <MessageTime>{getTime(time)}</MessageTime>
      </ActionWrapper>
      {unreadCount !== 0 && <UnreadMessages>{unreadCount}</UnreadMessages>}
      {isPinned(unreadCount, pinned) && <PinnedMessage />}
    </>
  )
}

const Chat = (props: ChatProps): ReactNode => {
  const query = {
    id: props.photoId,
    type: TYPES.FILES.PHOTO,
  }
  const { data, loading, refetch, storage } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)

  let avatar = !loading && data ? getImageFile(props.photoId, data.files, refetch) : ''
  let { title } = props
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

  const showOnline = props.type === 'chatTypePrivate' && !isSaved && props.id !== 777000

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
          action={
            <Actions
              unreadCount={props.unreadCount}
              time={props.lastMessage.date}
              pinned={props.pinned}
            />
          }
        />
      </ChatHoverable>
    </ChatWrapper>
  )
}

export default Chat
