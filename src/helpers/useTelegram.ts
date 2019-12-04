import React, { useState } from 'react'
import deepmerge from 'deepmerge'
import { USE_TELEGRAM } from '@/constants'
import { telegram } from './telegram'
import store, { storage } from './store'

const { GET_LIST_OF_CHATS, GET_AVATARS_CHATS } = USE_TELEGRAM

function createHook(fn) {
  return function(opts = {}) {
    const [state, setState] = useState({
      loading: true,
      data: {},
      storage,
    })
    const { loading, data } = state

    const refetch = () => {
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

const getListOfChats = createHook(telegram.getListOfChats)

const getAvatar = createHook(store.getAvatar)

export function useTelegram(CONSTANT_QUERY, opts = false) {
  const queries = {
    GET_LIST_OF_CHATS: getListOfChats,
    GET_AVATARS_CHATS: getAvatar,
  }

  return queries[CONSTANT_QUERY](opts)
}

export { USE_TELEGRAM }
