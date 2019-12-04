export const toImage = blob => {
  window.URL = window.URL || window.webkitURL

  return window.URL.createObjectURL(blob)
}
