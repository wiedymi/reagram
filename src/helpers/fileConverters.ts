export const toImage = (blob): string => {
  window.URL = window.URL || window.webkitURL

  return window.URL.createObjectURL(blob)
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
