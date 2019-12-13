import { storage, api, toObject } from '../helpers'

export const getMe = async function(): void {
  const isMe = storage.getMe()
  if (Object.keys(isMe).length > 0) {
    return isMe
  }

  const me = await api.getMe()

  return storage.setMe(toObject(me))
}
