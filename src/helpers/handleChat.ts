import { TYPES } from '@/constants'

const { PRIVATE, SUPERGROUP, CHANNEL } = TYPES.CHATS

export const handleChats = (chatInfo): string => {
  const { type } = chatInfo

  switch (type._) {
    case PRIVATE:
      return PRIVATE
    case SUPERGROUP:
      if (type.isChannel) {
        return CHANNEL
      }

      return SUPERGROUP
    default:
      return
  }
}
