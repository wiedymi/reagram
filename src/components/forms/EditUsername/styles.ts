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

export const Title = styled.h4`
  font-weight: 600;
  color: #a9a9a9;
  margin-bottom: ${(props): string => get.margin(props).tiny};
`

export const Text = styled.p`
  margin-top: ${(props): string => get.margin(props).small};
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1em;
`

export const LinkShare = styled.p`
  margin-top: ${(props): string => get.margin(props).small};
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1em;
  display: flex;
  flex-flow: column;
  a {
    width: 100%;
    color: ${(props): string => get.colors(props).primary};
    text-decoration: none;
  }
`
