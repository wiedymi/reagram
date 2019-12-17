import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const Image = styled.img`
  width: 80px;
`
export const Circle = styled.div`
  background-color: ${(props): string => {
    if (!props.image) {
      return get.colors(props).primary
    }
  }} !important;
  background-image: url(${({ image }): string => image});
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 40px;
  margin: ${(props): string => get.margin(props).tiny};
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  cursor: ${({ hidden }): string => (hidden ? 'default' : 'pointer')};
`
export const Input = styled.input`
  display: none;
`

export const Title = styled.p`
  font-size: 3rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`
