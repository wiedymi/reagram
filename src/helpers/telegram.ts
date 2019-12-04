import { Airgram, toObject } from '@airgram/web'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'
import { config } from '@/constants'
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

    const { lastMessage, title } = toObject(result)

    const sentBy = lastMessage.senderUserId
      ? await airgram.api.getUserFullInfo(lastMessage.senderUserId)
      : 'channel'

    return {
      title,
      lastMessage: lastMessage.content,
      sentBy,
      photoId: toObject(result).photo.big.id,
      raw: toObject(result),
    }
  }
  const chats = await asyncMap(ids, callback)

  return chats
}

airgram.logout = async function(): void {
  await airgram.api.logOut()
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
