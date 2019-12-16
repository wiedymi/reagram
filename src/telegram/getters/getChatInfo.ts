import { api, toObject } from '../core'

export const getChatInfo = async function({ chatId }): Promise {
  const raw = await api.getChat({ chatId })
  const result = toObject(raw)
  const { supergroupId } = result.type

  if (supergroupId && supergroupId !== undefined) {
    const fullInfo = await api.getSupergroupFullInfo({ supergroupId })

    return { ...result, ...toObject(fullInfo) }
  }

  return result
}
