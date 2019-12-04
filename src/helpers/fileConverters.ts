export const toImage = (blob): string => {
  window.URL = window.URL || window.webkitURL

  return window.URL.createObjectURL(blob)
}
