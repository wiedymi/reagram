import styled from '@emotion/styled'
import { IconButton as IButton } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: ${(props): string => get.padding(props).tiny};
`
export const LeftNav = styled.div`
  max-width: 40px;
  max-height: 40px;
  height: 40px;
  width: 40px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MiddleNav = styled.div`
  width: 100%;
  margin-left: ${(props): string => get.margin(props).small};
`

export const RightNav = styled.div`
  max-width: 40px;
  max-height: 40px;
  height: 40px;
  width: 40px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.b`
  font-size: 1.25rem;
  width: 100%;
`

export const IconButton = styled(IButton)`
  max-width: 40px;
  max-height: 40px;
  padding: 0 !important;
  min-height: 40px;
  min-width: 40px;
`
