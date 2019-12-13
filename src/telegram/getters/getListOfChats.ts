import { api, asyncMap, toObject } from '../core'

export const getListOfChats = async function(limit): array {
  const result = await api.getChats({
    limit: limit || 10,
    offsetChatId: 0,
    offsetOrder: '9223372036854775807',
  })

  const ids = toObject(result).chatIds

  const callback = async (chatId): object => {
    const result = await api.getChat({ chatId })

    const { lastMessage, title, type } = toObject(result)

    const sentBy =
      lastMessage.senderUserId !== 0
        ? await api.getUser({ userId: lastMessage.senderUserId })
        : await api.getChat({ chatId: lastMessage.chatId })
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
      photoId: raw.photo && raw.photo.big.id,
      type: type._,
      raw,
    }
  }
  const chats = await asyncMap(ids, callback)

  return chats
}
