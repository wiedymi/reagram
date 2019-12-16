import { useState } from 'react'
import { storage } from './storage'
import { listen } from './api'

export function createHook(fn) {
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

export function createActionHook(fn, EVENT): void {
  return function ActionHook(defaultQuery): array {
    const [updating, setUpdating] = useState()
    const [processing, setProcessing] = useState()
    const action = async (query = defaultQuery): object => {
      setProcessing(true)
      const data = await fn(query)
      setProcessing(false)
      return data
    }

    if (!EVENT) {
      return [action, { storage }]
    }

    listen(EVENT, async ({ update }, next) => {
      setUpdating(update)

      next()
    })

    return [action, { updating, processing, storage }]
  }
}
