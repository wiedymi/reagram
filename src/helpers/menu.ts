export const createIsInView = list => view => {
  if (list.includes(view)) {
    return true
  }

  return false
}
