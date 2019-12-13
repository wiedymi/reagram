import { download } from '@/helpers/store'

export const getFile = async function({ id, type }): Promise<object> {
  const file = await download({ id, type })

  return file
}
