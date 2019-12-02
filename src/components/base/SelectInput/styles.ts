import styled from '@emotion/styled'
import { TextField } from '@material-ui/core'

export const Wrapper = styled.div`
  display: flex;
`

export const Input = styled(TextField)`
  margin-top: 20px !important;
  & label.Mui-focused {
    color: ${props => getColors(props).primary};
  }

  & .MuiInput-underlineafter {
    border-bottom-color: ${props => getColors(props).primary};
  }

  & .MuiOutlinedInput-root {
    width: 320px;
    border-radius: 10px;
    & fieldset {
      border-color: ${props => getColors(props).offset};
    }

    &:hover fieldset {
      border-color: ${props => getColors(props).primary};
    }

    &.Mui-focused fieldset {
      border-color: ${props => getColors(props).primary};
    }
  }
`
