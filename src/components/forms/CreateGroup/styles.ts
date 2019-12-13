import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  overflow: hidden;
  justify-content: center;
  flex-flow: column;
  height: 100%;
  position: relative;
  .MuiOutlinedInput-root {
    width: 100%!important;
  }
}
`

export const Button = styled.button`
  border: 0;
  border-radius: ${(props): string => get.radius(props).around};
  position: absolute;
  background-color: ${(props): string => get.colors(props).primary};
  right: 0;
  bottom: 0;
  color: #fff;
  width: 50px;
  height: 50px;
  margin-right: ${(props): string => get.margin(props).tiny};
`
