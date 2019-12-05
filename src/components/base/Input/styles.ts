import styled from '@emotion/styled'
import { TextField, OutlinedInput as MInput } from '@material-ui/core'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

export const Input = styled(TextField)`
  margin-top: 20px !important;
  width: ${(props): string => (!props.fluid ? '' : '100%')} !important;
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
    width: ${(props): string => (!props.fluid ? '360px' : '100%')} !important;
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
export const OutlinedInput = styled(MInput)`
  width: 100%;
`
