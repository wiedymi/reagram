import { telegram } from './telegram'

const connection = () => {
  const open = indexedDB.open('tdlib', 1)
  return new Promise((resolve, reject) => {
    open.onerror = () => {
      reject()
    }

    open.onsuccess = function() {
      const db = this.result
      const transaction = db.transaction('keyvaluepairs', 'readwrite')
      const objectStore = transaction.objectStore('keyvaluepairs')

      resolve(objectStore)
    }
  })
}

const getter = db => {
  return key =>
    new Promise((resolve, reject) => {
      const file = db.get(key)
      file.onerror = () => {
        reject()
      }
      file.onsuccess = () => {
        resolve(file.result)
      }
    })
}

const storage = (() => {
  const state = {
    blobs: [],
  }

  return {
    set: file => {
      const isExist = state.blobs.filter(val => {
        return val.id === file.id
      })

      if (isExist.length === 0) {
        return state.blobs.push(file)
      }
    },
    getState: () => state,
  }
})()

const download = async file => {
  const state = storage.getState()
  const isExist = state.blobs.filter(val => {
    return val.id === file.id
  })

  if (isExist.length !== 0) {
    return new Promise(resolve => resolve(state))
  }

  const files = await telegram.api.downloadFile({
    fileId: file.id,
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
        storage.set({ id: file.id, id_string: remote.id, blob })
        resolve(storage.getState())
      }
    })
  })
}

const init = async () => {
  const db = await connection()

  return {
    download,
    storage,
    get: getter(db),
  }
}

export default {
  init,
}
