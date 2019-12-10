import { useState } from 'react'
import { USE_TELEGRAM } from '@/constants'
import { telegram } from './telegram'
import store, { storage } from './store'

const {
  GET_LIST_OF_CHATS,
  GET_AVATARS_CHATS,
  GET_ME,
  GET_CONTACTS,
  GET_CHAT_MESSAGES,
  SEND_TEXT_MESSAGE,
} = USE_TELEGRAM

function createHook(fn) {
  return function(opts = {}): object {
    const [state, setState] = useState({
      loading: true,
      data: {},
      storage,
    })
    const { loading, data } = state

    const refetch = (): void => {
      setState({
        loading: true,
        data: {},
        storage,
        refetch,
      })
    }

    const values = loading ? fn(opts) : data

    if (loading) {
      values.then(newData => {
        setState({ loading: false, data: newData, storage, refetch })
      })

      return {
        loading,
        data,
        storage,
        refetch,
      }
    }

    if (!loading && !data) {
      return {
        loading: true,
        data,
        storage,
        refetch,
      }
    }

    return {
      loading,
      data,
      storage,
      refetch,
    }
  }
}

function createActionHook(fn): array {
  const action = async query => {
    const data = await fn(query)

    return data
  }

  return () => [action]
}

const getListOfChats = createHook(telegram.getListOfChats)

const getContacts = createHook(telegram.getContacts)

const getAvatar = createHook(store.getAvatar)

const getMe = createHook(telegram.getMe)

const getChatMessages = createHook(telegram.getChatMessages)

const sendTextMessage = createActionHook(telegram.sendTextMessage)

export function useTelegram(CONSTANT_QUERY, opts = false): object {
  const queries = {
    [GET_LIST_OF_CHATS]: getListOfChats,
    [GET_AVATARS_CHATS]: getAvatar,
    [GET_ME]: getMe,
    [GET_CONTACTS]: getContacts,
    [GET_CHAT_MESSAGES]: getChatMessages,
    [SEND_TEXT_MESSAGE]: sendTextMessage,
  }

  return queries[CONSTANT_QUERY](opts)
}

export { USE_TELEGRAM }
