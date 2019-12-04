import { telegram } from './telegram'

const connection = (): Promise<Any> => {
  const open = indexedDB.open('tdlib', 1)
  return new Promise((resolve, reject) => {
    open.onerror = (): void => {
      reject()
    }

    open.onsuccess = function(): void {
      const db = this.result
      const transaction = db.transaction('keyvaluepairs', 'readwrite')
      const objectStore = transaction.objectStore('keyvaluepairs')

      resolve(objectStore)
    }
  })
}

const getter = db => {
  return (key): Promise<Any> =>
    new Promise((resolve, reject) => {
      const file = db.get(key)
      file.onerror = (): void => {
        reject()
      }
      file.onsuccess = (): void => {
        resolve(file.result)
      }
    })
}

export const storage = ((): object => {
  const state = {
    files: [],
  }

  return {
    set: (file): object => {
      const isExist = state.files.filter(val => {
        return val.id === file.id
      })

      if (isExist.length === 0) {
        state.files.push(file)

        return state
      }
    },
    getState: (): object => state,
  }
})()

const download = async (query): Promise<Any> => {
  if (!query.type) {
    throw new Error('You have to provide file type')
  }
  const state = storage.getState()
  const isExist = state.files.filter(val => {
    return val.id === query.id
  })

  if (isExist.length !== 0) {
    return new Promise(resolve => resolve(state))
  }

  await telegram.api.downloadFile({
    fileId: query.id,
    priority: 1,
  })

  return new Promise(resolve => {
    telegram.on('updateFile', async ({ update: { file } }, next) => {
      const { local, remote } = file
      const { isDownloadingCompleted } = local

      if (isDownloadingCompleted) {
        const db = await connection()
        const get = getter(db)
        const blob = await get(remote.id)
        storage.set({ id: file.id, idString: remote.id, blob, type: query.type })
        resolve(storage.getState())
      }
      next()
    })
  })
}

const init = async (): Promise<object> => {
  const db = await connection()

  return {
    download,
    storage,
    get: getter(db),
  }
}

const getAvatar = async function({ id, type }): Promise<object> {
  const file = await download({ id, type })

  return file
}

export default {
  init,
  getAvatar,
}
