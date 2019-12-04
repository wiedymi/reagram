import styled from '@emotion/styled'
import Badge from '@material-ui/core/Badge'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const OnlineBadge = styled(Badge)`
  .MuiBadge-dot {
    display: ${({ showOnline }): string => (showOnline ? 'inline-flex' : 'none')};
    height: 12px !important;
    border: 2px solid #ffffff !important;
    min-width: 12px !important;
  }
  .MuiBadge-colorPrimary {
    background-color: ${(props): string => getColors(props).green} !important;
  }
`

export const ChatWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  flex-flow: column;
`

export const ChatHoverable = styled.div`
  &:hover {
    border-radius: 10px;
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
  }
  .MuiCardHeader-content {
    overflow: hidden !important;
  }
  .MuiAvatar-root {
    ${({ isSaved }): string => (isSaved ? 'padding: 10px!important' : '')};
    width: 50px !important;
    height: 50px !important;
    background: ${(props): string => getColors(props).primary} !important;
  }
  .MuiCardHeader-action {
    align-self: unset !important;
    justify-content: flex-end !important;
    align-content: flex-end !important;
    display: flex !important;

    margin-right: 0 !important;
  }
`

export const UnreadMessages = styled.span`
  color: #fff;
  background-color: ${(props): string => getColors(props).green} !important;
  height: 20px;
  display: flex;
  padding: 0 6px;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  margin-top: 5px;
  min-width: 20px;
  box-sizing: border-box;

  font-weight: 500;

  align-content: center;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
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
