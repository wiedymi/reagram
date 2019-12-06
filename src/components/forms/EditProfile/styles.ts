import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  overflow: hidden;
  justify-content: center;
  flex-flow: column;
  padding: ${(props): string => get.padding(props).normal};
  .MuiOutlinedInput-root {
    width: 100%!important;
  }
}
`
