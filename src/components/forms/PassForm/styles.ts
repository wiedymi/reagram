import styled from '@emotion/styled'
import { FormControl } from '@material-ui/core'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const InputWrapper = styled(FormControl)`
  width: 360px;

  fieldset {
    border-radius: 10px;
  }

  .MuiInputLabel-root.Mui-focused {
    color: ${(props): string => getColors(props).primary}!important;
  }

  .MuiInputBase-root .Mui-focused {
    color: ${(props): string => getColors(props).primary}!important;
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => getColors(props).primary}!important;
  }

  .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props): string => getColors(props).offset}!important;
    }

    &:hover fieldset {
      border-color: ${(props): string => getColors(props).black}!important;
    }

    &.Mui-focused fieldset {
      border-color: ${(props): string => getColors(props).primary}!important;
    }
  }
`
