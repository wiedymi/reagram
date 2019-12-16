import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  overflow: hidden;
  justify-content: center;
  flex-flow: column;
  height: 100%;
  padding: ${(props): string => get.padding(props).normal};
`
