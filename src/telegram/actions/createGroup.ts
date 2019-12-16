import { setChatPhoto } from '@/telegram/setters'
import { toObject, toLocalFile, createActionResponse, api } from '@/telegram/core'

export const createGroup = async function({ title, userIds, image }): Promise {
  try {
    const raw = await api.createNewBasicGroupChat({ title, userIds })
    const result = toObject(raw)
    const {
      local: { path },
    } = await toLocalFile(image)

    await setChatPhoto(path, result.id)

    return createActionResponse(null, result)
  } catch (error) {
    return createActionResponse(error)
  }
}
