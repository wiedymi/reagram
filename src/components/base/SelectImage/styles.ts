import styled from '@emotion/styled'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const Image = styled.img`
  width: 80px;
`
export const Circle = styled.div`
  background-color: ${(props): string => getColors(props).primary} !important;
  background-image: url(${({ image }): string => image});
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 40px;
  margin: 10px;
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  cursor: ${({ hidden }): string => (hidden ? 'default' : 'pointer')};
`
export const Input = styled.input`
  display: none;
`
