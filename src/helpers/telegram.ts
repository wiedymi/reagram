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
}

airgram.getMe = async function(): void {
  const isMe = storage.getMe()
  if (Object.keys(isMe).length > 0) {
    return isMe
  }

  const me = await airgram.api.getMe()

  return storage.setMe(toObject(me))
}

airgram.getContacts = async function(): Promise {
  const contacts = await airgram.api.getContacts()
  const result = toObject(contacts)

  let users = []
  if (918472618 > 0) {
    // result.userIds.length
    const data = await asyncMap(
      [918472618], // result.userIds
      async (id): Promise => {
        const res = await airgram.api.getUser({ userId: id })

        return toObject(res)
      },
    )
    users = data
  }

  return {
    totalCount: 1, // result.totalCount,
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

export const telegram = airgram
