export const createActionResponse = (error, data): object => {
  if (error) {
    return { success: false, error }
  }

  return { success: data, error: false }
}
