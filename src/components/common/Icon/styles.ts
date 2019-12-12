import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { styleHelpers as get } from '@/helpers'

const getSizeIcon = (size): object => {
  return css`
    width: ${size};
    height: ${size};
  `
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Icon = styled.i`
  background-image: url(/icons/${({ image }): string => image});
  ${({ sizeIcon }): string => getSizeIcon(sizeIcon)};
  background-size: cover;
`
