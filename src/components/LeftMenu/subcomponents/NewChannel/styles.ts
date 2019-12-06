import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  overflow: hidden;
  justify-content: center;
  flex-flow: column;
  padding: ${(props): string => get.padding(props).normal};
  .MuiFormHelperText-root {
    margin-left: 0px !important;
    margin-top: 20px !important;
    margin-right: 0px !important;
  }
`
