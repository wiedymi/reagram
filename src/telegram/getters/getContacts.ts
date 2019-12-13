import { api, toObject } from '../helpers'
import { getUserInfo } from './getUserInfo'

export const getContacts = async function(): Promise {
  const contacts = await api.getContacts()
  const result = toObject(contacts)

  const users = result.userIds.length > 0 ? await asyncMap(result.userIds, getUserInfo) : []

  return {
    totalCount: result.totalCount,
    users,
  }
}
