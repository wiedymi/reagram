export const storage = ((): object => {
  let state = {
    files: [],
    me: {},
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
    setMe: (me): object => {
      state = {
        ...state,
        me,
      }

      return state.me
    },
    getMe: (): object => state.me,
  }
})()
