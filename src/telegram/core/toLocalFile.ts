import { toObject } from './toObject'
import { api } from './api'

export const toLocalFile = async (file, priority = 1): object => {
  const toLocal = await api.uploadFile({
    file: {
      _: 'inputFileBlob',
      name: file.name,
      data: file,
    },
    fileType: {
      _: 'fileTypeProfilePhoto',
    },
    priority,
  })

  return toObject(toLocal)
}
