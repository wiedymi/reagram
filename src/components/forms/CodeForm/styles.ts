import styled from '@emotion/styled'
import { Typography, TextField, Button } from '@material-ui/core'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const Wrapper = styled.div`
  display: flex;
  transition: all 0.8s ease-out;
  justify-content: center;
  align-items: center;
  min-height: ${({ nextStageButton }): string => (nextStageButton ? '90vh' : '80vh')};
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
  flex-flow: column;
`

export const Input = styled(TextField)`
  margin-top: 20px !important;
  & label.Mui-focused {
    color: ${(props): string => getColors(props).primary};
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  & .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => getColors(props).primary};
  }

  & .MuiOutlinedInput-root {
    width: 360px !important;
    border-radius: 10px;
    & fieldset {
      border-color: ${(props): string => getColors(props).offset};
    }

    &:hover fieldset {
      border-color: ${(props): string => getColors(props).black};
    }

    &.Mui-focused fieldset {
      border-color: ${(props): string => getColors(props).primary};
    }
  }
`
export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px !important;
  margin-bottom: 10px !important;
`

export const Subtitle = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7d7d7d;
  width: 240px;
  justify-content: center;
  text-align: center;
  margin-bottom: 30px !important;
`

export const NextStageButton = styled(Button)`
  text-transform: uppercase;
  width: 100%;
  border-radius: 10px !important;
  padding: 15px !important;
  margin-top: 20px !important;
  background-color: ${(props): string => getColors(props).primary} !important;
`
