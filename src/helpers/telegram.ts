import { Airgram, toObject } from '@airgram/web'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'
import { config } from '@/constants'
import { storage } from './store'
const { authorizationStateWaitPhoneNumber } = AUTHORIZATION_STATE

const { updateAuthorizationState } = UPDATE

async function asyncMap(array, callback): array {
  const values = []
  for (let index = 0; index < array.length; index++) {
    values.push(await callback(array[index], index, array))
  }

  return values
}

const airgram = new Airgram({
  apiId: config.APP_ID,
  apiHash: config.API_HASH,
  filesDirectory: './assets/',
  databaseDirectory: './db',
  mode: 'wasm',
  // jsLogVerbosityLevel: 'debug',
})

airgram.getListOfChats = async function(limit): array {
  const result = await airgram.api.getChats({
    limit: limit || 10,
    offsetChatId: 0,
    offsetOrder: '9223372036854775807',
  })

  const ids = toObject(result).chatIds

  const callback = async (chatId): object => {
    const result = await airgram.api.getChat({ chatId })

    const { lastMessage, title, type } = toObject(result)

    const sentBy =
      lastMessage.senderUserId !== 0
        ? await airgram.api.getUser({ userId: lastMessage.senderUserId })
        : await airgram.api.getChat({ chatId: lastMessage.chatId })
    const raw = toObject(result)

    console.log(' raw', raw)
    return {
      id: raw.id,
      title,
      isPinned: raw.isPinned,
      lastMessage: {
        ...lastMessage.content,
        id: lastMessage.id,
        isChannelPost: lastMessage.isChannelPost,
        isOutgoing: lastMessage.isOutgoing,
        replyToMessageId: lastMessage.replyToMessageId,
        senderUserId: lastMessage.senderUserId,
        type: type._,
        date: +`${lastMessage.date}000`,
        sentBy: toObject(sentBy),
      },
      unreadCount: raw.unreadCount,
      photoId: raw.photo && raw.photo.big.id,
      type: type._,
      raw,
    }
  }
  const chats = await asyncMap(ids, callback)

  return chats
}

airgram.logout = async function(): void {
  localStorage.removeItem('isLogged')
  await airgram.api.logOut()

  this.editPhone()
}

airgram.getMe = async function(): void {
  const isMe = storage.getMe()
  if (Object.keys(isMe).length > 0) {
    return isMe
  }

  const me = await airgram.api.getMe()

  return storage.setMe(toObject(me))
}

airgram.getUserInfo = async function(id): Promise {
  const info = await airgram.api.getUser({ userId: id })
  const fullInfo = await airgram.api.getUserFullInfo({ userId: id })

  return {
    ...toObject(info),
    ...toObject(fullInfo),
  }
}

airgram.getContacts = async function(): Promise {
  const contacts = await airgram.api.getContacts()
  const result = toObject(contacts)

  const users = result.userIds.length > 0 ? await asyncMap(result.userIds, airgram.getUserInfo) : []

  return {
    totalCount: result.totalCount,
    users,
  }
}

airgram.editPhone = async function(): void {
  this.emit({
    _: updateAuthorizationState,
    authorizationState: {
      _: authorizationStateWaitPhoneNumber,
    },
  })
}

airgram.getChatMessages = async function({ chatId, offset, limit }): Promise {
  const lastMessage = await airgram.api.getChat({ chatId })
  const fromMessageId = toObject(lastMessage).lastMessage.id
  let messages = await airgram.api.getChatHistory({ chatId, offset, limit, fromMessageId })
  messages.response.messages.unshift(toObject(lastMessage).lastMessage)

  const { supergroupId } = toObject(lastMessage).type

  if (!supergroupId) {
    const callback = async (message): object => {
      const user = await airgram.api.getUser({ userId: message.senderUserId })

      return {
        ...message,
        user: toObject(user),
      }
    }

    messages = await asyncMap(messages.response.messages, callback)
  }

  if (supergroupId && supergroupId !== undefined) {
    const fullInfo = await airgram.api.getSupergroupFullInfo({ supergroupId })

    return {
      messages: messages.response.messages,
      chatInfo: { ...toObject(lastMessage), ...toObject(fullInfo) },
    }
  }

  return { messages, chatInfo: toObject(lastMessage) }
}

airgram.sendTextMessage = async function(query): Promise {
  const sent = await airgram.api.sendMessage({
    ...query,
    inputMessageContent: {
      _: 'inputMessageText',
      text: {
        _: 'formattedText',
        text: query.message,
      },
    },
  })

  return sent
}

airgram.createChannel = async function(query): Promise {
  const result = await airgram.api.createNewSupergroupChat({ ...query, isChannel: true })
  const photo = await airgram.api.setChatPhoto({
    chatId: toObject(result).id,
    photo: {
      _: 'inputFileLocal',
      path: query.image,
    },
  })
  console.log('photo', photo)
  return toObject(result)
}

export const telegram = airgram
