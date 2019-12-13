import { api, toObject } from '../helpers'

export const getUserInfo = async function(userId): Promise {
  const info = await api.getUser({ userId })
  const fullInfo = await api.getUserFullInfo({ userId })

  return {
    ...toObject(info),
    ...toObject(fullInfo),
  }
}
