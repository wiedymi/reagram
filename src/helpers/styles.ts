const createGetter = (NAME): void => {
  return ({ theme }): object => {
    return theme[NAME]
  }
}

export const colors = createGetter('COLORS')

export const padding = createGetter('PADDING')

export const margin = createGetter('MARGIN')

export const radius = createGetter('RADIUS')
