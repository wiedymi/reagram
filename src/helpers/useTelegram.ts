import React, { useState } from 'react'
import { USE_TELEGRAM } from '@/constants'
import { telegram } from './telegram'

const { GET_LIST_OF_CHATS } = USE_TELEGRAM

function createHook(fn) {
  return function(opts = {}) {
    const [state, setState] = useState({
      loading: true,
      data: {},
    })
    const { loading, data } = state

    const values = loading ? fn() : data

    if (loading) {
      values.then(data => {
        setState({ loading: false, data })
      })

      return {
        loading,
        data,
      }
    }

    if (!loading && !data) {
      return {
        loading: true,
        data,
      }
    }

    return {
      loading,
      data,
    }
  }
}

const getListOfChats = createHook(telegram.getListOfChats)

export function useTelegram(CONSTANT_QUERY) {
  const queries = {
    GET_LIST_OF_CHATS: getListOfChats,
  }

  return queries[CONSTANT_QUERY]()
}

export { USE_TELEGRAM }
