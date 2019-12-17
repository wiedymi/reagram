import { api, toObject } from '../core'
import { getChatInfo } from './getChatInfo'

export const getChatMessages = async function({ chatId, offset, limit }): Promise {
  const chatInfo = await getChatInfo({ chatId })
  const fromMessageId = chatInfo.lastMessage.id
  const messages = await api.getChatHistory({ chatId, offset, limit, fromMessageId })
  messages.response.messages.unshift(chatInfo.lastMessage)
  messages.response.messages.reverse()

  return { ...toObject(messages), chatInfo }
}
