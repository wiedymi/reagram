import { api, toObject } from '../helpers'

export const getChatMessages = async function({ chatId, offset, limit }): Promise {
  const lastMessage = await api.getChat({ chatId })
  const fromMessageId = toObject(lastMessage).lastMessage.id
  const messages = await api.getChatHistory({ chatId, offset, limit, fromMessageId })
  messages.response.messages.unshift(toObject(lastMessage).lastMessage)

  const { supergroupId } = toObject(lastMessage).type

  // if (!supergroupId) {
  //   const callback = async (message): object => {
  //     const user = await api.getUser({ userId: message.senderUserId })

  //     return {
  //       ...message,
  //       user: toObject(user),
  //     }
  //   }

  //   messages = await asyncMap(messages.response.messages, callback)
  // }

  if (supergroupId && supergroupId !== undefined) {
    const fullInfo = await api.getSupergroupFullInfo({ supergroupId })

    return {
      ...toObject(messages),
      chatInfo: { ...toObject(lastMessage), ...toObject(fullInfo) },
    }
  }

  return { ...toObject(messages), chatInfo: toObject(lastMessage) }
}
