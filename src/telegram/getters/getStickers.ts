import { api, toObject } from '../core'

export const getStickers = async function(limit = 250): Promise {
  const raw = await api.getStickers({ limit })
  const { stickers } = toObject(raw)

  return stickers.reduce((acc, val) => {
    const { setId, ...rest } = val
    if (!acc[setId]) {
      acc[setId] = [rest]
    } else {
      acc[setId] = [...acc[setId], rest]
    }

    return acc
  }, {})
}
