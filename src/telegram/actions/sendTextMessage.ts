import { api, toObject } from '../helpers'

export const sendTextMessage = async function(query): Promise {
  const sent = await api.sendMessage({
    ...query,
    inputMessageContent: {
      _: 'inputMessageText',
      text: {
        _: 'formattedText',
        text: query.message,
      },
    },
  })

  return toObject(sent)
}
