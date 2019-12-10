import styled from '@emotion/styled'
import { css } from '@emotion/core'

const getSize = ({ size }): string => {
  const sizes = {
    tiny: css`
      width: 1rem;
      height: 1rem;
    `,

    small: css`
      width: 20px;
      height: 20px;
    `,
  }

  return (
    sizes[size] ||
    css`
      width: 1rem;
      height: 1rem;
    `
  )
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Icon = styled.i`
  background-image: url(/icons/${({ image }): string => image});
  ${(props): string => getSize(props)}
  background-size: cover;
`
