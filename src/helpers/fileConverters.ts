export const toImage = (blob): string => {
  window.URL = window.URL || window.webkitURL

  return window.URL.createObjectURL(blob)
}

export const bytesToSize = (bytes, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const getImageFile = (id, blobs, refetch): string => {
  if (!id) {
    return ''
  }

  const photo = blobs.filter(blob => {
    return blob.id === id
  })

  if (photo.length === 0) {
    return refetch()
  }

  const [source] = photo

  return toImage(source.blob)
}

export const getAudioFile = (id, blobs): string => {
  if (!id) {
    return ''
  }

  const audio = blobs.filter(blob => {
    return blob.id === id
  })

  if (audio.length === 0) {
    return null
  }

  const [source] = audio

  return toImage(source.blob)
}

export const getAnimationFile = (id, blobs): string => {
  if (!id) {
    return ''
  }

  const animation = blobs.filter(blob => {
    return blob.id === id
  })

  if (animation.length === 0) {
    return null
  }

  const [source] = animation

  return toImage(source.blob)
}

export const fancyTimeFormat = (time): string => {
  const hrs = ~~(time / 3600)
  const mins = ~~((time % 3600) / 60)
  const secs = ~~time % 60

  let ret = ''

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}
