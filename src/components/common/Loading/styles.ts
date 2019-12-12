import styled from '@emotion/styled'
import { CircularProgress } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const Loading = styled(CircularProgress)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin-bottom: 20px;
  .MuiCircularProgress-svg {
    color: ${(props): string => get.colors(props).primary};
  }
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  flex-flow: column;
  width: 100%;
  align-items: center;
  min-height: ${({ height }): string => height + 'px'};
  min-width: ${({ width }): string => width + 'px'};
`

export const Message = styled.h3``
