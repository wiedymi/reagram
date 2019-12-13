import { toLocalFile, toObject, createActionResponse, api } from '../helpers'
import { setChatPhoto } from '../setters'

export const createChannel = async function({ title, description, image }): Promise {
  try {
    const raw = await api.createNewSupergroupChat({ title, description, isChannel: true })
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
