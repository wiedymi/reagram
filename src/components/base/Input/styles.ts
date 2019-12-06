import styled from '@emotion/styled'
import { TextField, OutlinedInput as MInput } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

export const Input = styled(TextField)`
  margin-top: 20px !important;
  width: ${(props): string => (!props.fluid ? '' : '100%')} !important;
  & label.Mui-focused {
    color: ${(props): string => get.colors(props).primary};
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  & .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => get.colors(props).primary};
  }

  & .MuiOutlinedInput-root {
    width: ${(props): string => (!props.fluid ? '360px' : '100%')} !important;
    border-radius: ${(props): string => get.radius(props).tiny};
    & fieldset {
      border-color: ${(props): string => get.colors(props).offset};
    }

    &:hover fieldset {
      border-color: ${(props): string => get.colors(props).black};
    }

    &.Mui-focused fieldset {
      border-color: ${(props): string => get.colors(props).primary};
    }
  }
`
export const OutlinedInput = styled(MInput)`
  width: 100%;
`
