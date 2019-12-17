import { handleChats } from '@/helpers'
import { TYPES } from '@/constants'
import { api, toObject } from '../core'

const { CHANNEL, SUPERGROUP, PRIVATE } = TYPES.CHATS

export const getChatInfo = async function({ chatId }: object): Promise<object> {
  const raw = await api.getChat({ chatId })
  const result = toObject(raw)
  const type = handleChats(result)

  if (type === SUPERGROUP) {
    const { supergroupId } = result.type
    const fullInfo = await api.getSupergroupFullInfo({ supergroupId })

    return { ...result, ...toObject(fullInfo) }
  }

  if (type === CHANNEL) {
    const { supergroupId } = result.type
    const fullInfo = await api.getSupergroupFullInfo({ supergroupId })

    return { ...result, ...toObject(fullInfo) }
  }

  if (type === PRIVATE) {
    const { userId } = result.type
    const userInfo = await api.getUser({ userId })
    const fullInfo = await api.getUserFullInfo({ userId })

    return { ...result, ...toObject(fullInfo), ...toObject(userInfo) }
  }

  return result
}
