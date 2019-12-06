import styled from '@emotion/styled'
import { CircularProgress, Typography } from '@material-ui/core'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  flex-wrap: nowrap;
  flex-flow: column;
`
export const Img = styled.img`
  display: flex;
  width: 180px;
  justify-items: center;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-wrap: nowrap;
`

export const Progress = styled(CircularProgress)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  .MuiCircularProgress-svg {
    color: ${(props): string => getColors(props).primary};
  }
`

export const Text = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px !important;
`
