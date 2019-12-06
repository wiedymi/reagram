import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  flex-flow: column;

  .MuiFormHelperText-root {
    margin-left: 0px !important;
    margin-top: ${(props): string => get.margin(props).normal};
    margin-right: 0px !important;
  }

  hr {
    width: 100%;
    border-color: white;
    background: white;
  }
`
