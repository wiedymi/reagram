import { toObject, api } from '../helpers'

export const setChatPhoto = async (path, chatId): object => {
  const result = await api.setChatPhoto({
    chatId,
    photo: {
      _: 'inputFileLocal',
      path,
    },
  })

  return toObject(result)
}
