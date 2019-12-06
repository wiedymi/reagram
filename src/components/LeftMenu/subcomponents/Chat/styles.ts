import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Badge from '@material-ui/core/Badge'
import { styleHelpers as get } from '@/helpers'

export const OnlineBadge = styled(Badge)`
  .MuiBadge-dot {
    display: ${({ showOnline }): string => (showOnline ? 'inline-flex' : 'none')};
    height: 12px !important;
    border: 2px solid #ffffff !important;
    min-width: 12px !important;
  }
  .MuiBadge-colorPrimary {
    background-color: ${(props): string => get.colors(props).green} !important;
  }
`

export const ChatWrapper = styled.div`
  padding-right: ${(props): string => get.padding(props).tiny};
  padding-left: ${(props): string => get.padding(props).tiny};
  flex-flow: column;
  .MuiCardHeader-root {
    padding: ${(props): string => get.padding(props).tiny}!important;
  }
`

export const ChatHoverable = styled.div`
  &:hover {
    border-radius: ${(props): string => get.radius(props).tiny};
    background-color: #f4f4f5;
    cursor: pointer;
  }
  .MuiCardHeader-title {
    font-weight: bolder !important;
    font-size: 0.9rem !important;
  }
  .MuiTypography-body2 {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-right: ${(props): string => get.margin(props).tiny} !important;
  }
  .MuiCardHeader-content {
    overflow: hidden !important;
  }
  .MuiAvatar-root {
    ${({ isSaved }): string => (isSaved ? 'padding: 10px!important' : '')};
    width: 50px !important;
    height: 50px !important;
    background: ${(props): string => get.colors(props).primary} !important;
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
const circle = css`
  color: #fff;
  background-color: ${(props): string => get.colors(props).green} !important;
  height: 25px;
  min-width: 25px;
  display: flex;
  padding: 0 6px;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  margin-top: 5px;
  box-sizing: border-box;
  font-weight: 500;
  align-content: center;
  border-radius: 15px;
  flex-direction: row;
  justify-content: center;
  font-weight: 600;
`
export const UnreadMessages = styled.span`
  ${circle}
  background-color: ${(props): string => get.colors(props).green} !important;
`

export const PinnedMessage = styled.span`
  ${circle}
  background-image: url(/icons/pinnedchat_svg.svg);
  background-color: ${(props): string => get.colors(props).offset} !important;
`

export const MessageTime = styled.p`
  font-size: 12px;
  margin-top: -15px;
`

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
`
