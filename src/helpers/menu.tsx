import React from 'react'

export const createIsInView = list => view => {
  if (list.includes(view)) {
    return true
  }

  return false
}

export const createViewController = list => {
  return function Views(props: ViewType): ReactNode {
    const View = list[props.view]

    return <View {...props} />
  }
}
