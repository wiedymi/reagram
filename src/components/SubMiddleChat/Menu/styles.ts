import styled from '@emotion/styled'
import { CardHeader } from '@material-ui/core'
export { Avatar } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  padding: ${(props): string => get.padding(props).tiny}
  max-height: 60px;
  min-height: 60px;
  justify-items: center;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .MuiCardHeader-title{
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-right: ${(props): string => get.margin(props).tiny} !important;
    font-weight: 600!important;
  }
  .MuiAvatar-root {
    ${({ isSaved }): string => isSaved && 'padding: 10px!important'};
    background: ${(props): string => get.colors(props).primary} !important;
  }

  .MuiCardHeader-content {
    overflow: hidden !important;
  }

  .MuiCardHeader-action {
    align-self: unset !important;
    justify-content: flex-end !important;
    align-content: flex-end !important;
    display: flex !important;
    margin-top: -16px !important;
    margin-right: 0 !important;
  }
`
export const Header = styled(CardHeader)`
  padding: 0 10px !important;
`
