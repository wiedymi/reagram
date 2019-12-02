import styled from '@emotion/styled'
import { FormControl, Typography, OutlinedInput as MInput, Button } from '@material-ui/core'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const InputWrapper = styled(FormControl)`
  width: 360px;

  fieldset {
    border-radius: 10px;
  }

  .MuiInputLabel-root.Mui-focused {
    color: ${props => getColors(props).primary}!important;
  }

  .MuiInputBase-root .Mui-focused {
    color: ${props => getColors(props).primary}!important;
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  .MuiInput-underlineafter {
    border-bottom-color: ${props => getColors(props).primary}!important;
  }

  .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${props => getColors(props).offset}!important;
    }

    &:hover fieldset {
      border-color: ${props => getColors(props).black}!important;
    }

    &.Mui-focused fieldset {
      border-color: ${props => getColors(props).primary}!important;
    }
  }
`
export const Wrapper = styled.div`
  display: flex;
  transition: all 0.8s ease-out;
  justify-content: center;
  align-items: center;
  min-height: ${({ nextStageButton }) => (nextStageButton ? '90vh' : '80vh')};
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

export const Input = styled(MInput)``
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
  background-color: ${props => getColors(props).primary} !important;
`
