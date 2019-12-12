import styled from '@emotion/styled'
import { TextField } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
`
export const Input = styled(TextField)`
  margin-top: 20px !important;
  & label.Mui-focused {
    color: ${(props): string => get.colors(props).primary};
  }

  & .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => get.colors(props).primary};
  }

  & .MuiOutlinedInput-root {
    width: 320px;
    border-radius: ${(props): string => get.radius(props).tiny};
    & fieldset {
      border-color: ${(props): string => get.colors(props).offset};
    }

    &:hover fieldset {
      border-color: ${(props): string => get.colors(props).primary};
    }

    &.Mui-focused fieldset {
      border-color: ${(props): string => get.colors(props).primary};
    }
  }
`
