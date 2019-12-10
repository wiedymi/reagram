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
      photoId: raw.photo.big.id,
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
  const messages = await airgram.api.getChatHistory({ chatId, offset, limit, fromMessageId })
  messages.response.messages.unshift(toObject(lastMessage).lastMessage)
  return { ...toObject(messages), chatInfo: toObject(lastMessage) }
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

export const telegram = airgram
