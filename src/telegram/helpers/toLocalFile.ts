import { toObject } from './toObject'

export const toLocalFile = async (file): object => {
  const toLocal = await airgram.api.uploadFile({
    file: {
      _: 'inputFileBlob',
      name: file.name,
      data: file,
    },
    fileType: {
      _: 'fileTypeProfilePhoto',
    },
    priority: 1,
  })

  return toObject(toLocal)
}
