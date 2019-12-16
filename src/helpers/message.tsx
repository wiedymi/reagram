import React from 'react'
import { TYPES } from '@/constants'

const {
  PHOTO,
  TEXT,
  AUDIO,
  STICKER,
  VIDEO,
  ANIMATION,
  SUPERGROUP_CHAT_CREATE,
  CHAT_CHANGE_PHOTO,
  UNSUPPORTED,
} = TYPES.MESSAGES

export const handleLastMessage = (message: object): Any => {
  switch (message._) {
    case TEXT: {
      if (message.type !== 'chatTypePrivate' && !message.isChannelPost) {
        const username =
          message && message.sentBy && message.sentBy.username ? message.sentBy.username : 'Bot'
        return (
          <>
            <strong>{username}: </strong>
            {message.text.text}
          </>
        )
      }

      return message.text.text
    }
    case PHOTO: {
      return 'Photo'
    }
    case AUDIO: {
      return `${message.audio.performer} - ${message.audio.title}.${
        message.audio.fileName.split('.')[1]
      }`
    }
    case STICKER: {
      return 'Sticker'
    }
    case VIDEO: {
      return 'Video'
    }
    case ANIMATION: {
      return 'GIF'
    }
    case SUPERGROUP_CHAT_CREATE: {
      return 'Supergroup chat created'
    }
    case CHAT_CHANGE_PHOTO: {
      return 'Avatar has been changed'
    }
    default: {
      return UNSUPPORTED
    }
  }
}

export const handleMessage = (message: object): Any => {
  switch (message._) {
    case TEXT: {
      return TEXT
    }
    case PHOTO: {
      return PHOTO
    }
    case AUDIO: {
      return AUDIO
    }
    case STICKER: {
      return STICKER
    }
    case VIDEO: {
      return VIDEO
    }
    case ANIMATION: {
      return ANIMATION
    }
    // case SUPERGROUP_CHAT_CREATE: {
    //   return SUPERGROUP_CHAT_CREATE
    // }
    // case CHAT_CHANGE_PHOTO: {
    //   return CHAT_CHANGE_PHOTO
    // }
    default: {
      return UNSUPPORTED
    }
  }
}
