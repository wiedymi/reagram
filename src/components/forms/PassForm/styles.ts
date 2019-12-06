import styled from '@emotion/styled'
import { FormControl } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const InputWrapper = styled(FormControl)`
  width: 360px;

  fieldset {
    border-radius: ${(props): string => get.radius(props).tiny};
  }

  .MuiInputLabel-root.Mui-focused {
    color: ${(props): string => get.colors(props).primary}!important;
  }

  .MuiInputBase-root .Mui-focused {
    color: ${(props): string => get.colors(props).primary}!important;
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => get.colors(props).primary}!important;
  }

  .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props): string => get.colors(props).offset}!important;
    }

    &:hover fieldset {
      border-color: ${(props): string => get.colors(props).black}!important;
    }

    &.Mui-focused fieldset {
      border-color: ${(props): string => get.colors(props).primary}!important;
    }
  }
`
