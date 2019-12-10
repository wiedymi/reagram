import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 84%;
  justify-content: flex-end;
  position: relative;
`

export const MessagesWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px;
  height: auto;
  position: inherit;
  bottom: 0;
  padding: 0 60px;
`

export const Message = styled.p`
  padding: ${(props): string => get.padding(props).tiny};
  width: 100%;
  padding-right: 40px;
  max-width: ${({ width }): string => width + 'px'};
`
export const Status = styled.div``

export const Date = styled.p`
  font-size: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 5px;
`

export const MessageBubble = styled.div`
  margin-top: ${(props): string => get.padding(props).small};
  position: relative;
  display: inline-block;
  ${(props): string => {
    if (props.sticker) {
      return ''
    }

    return 'box-shadow: 0px 0px 0px 1px #dedede'
  }};
  background: ${(props): string => {
    if (props.sticker) {
      return 'none'
    }

    return props.isMe ? get.colors(props).greenOffset : '#fff'
  }};
  align-self: ${({ isMe }): string => (isMe ? 'flex-end' : 'flex-start')};

  border-radius: ${(props): string => get.radius(props).tiny};
  &:before {
    position: absolute;
    content: '';
    bottom: 0;
    ${(props): string => {
      if (props.sticker) {
        return ''
      }

      return 'box-shadow: 0px 0px 0px 1px #dedede'
    }};
    height: 1px;
    z-index: 1;
    background-color: ${(props): string => {
      if (props.sticker) {
        return 'none'
      }

      return props.isMe ? get.colors(props).greenOffset : '#fff'
    }} !important;
    box-shadow: none !important;
    ${({ isMe }): string => (isMe ? 'right' : 'left')}: -6px !important;
    width: 20px !important;
  }
  &:after {
    position: absolute;
    content: '';
    ${(props): string => {
      if (props.sticker) {
        return ''
      }

      return 'box-shadow: 0px 0px 0px 1px #dedede'
    }};
    background: ${(props): string => {
      if (props.sticker) {
        return 'none'
      }

      return props.isMe ? get.colors(props).greenOffset : '#fff'
    }};
    ${({ isMe }): string => (isMe ? 'right' : 'left')}: -10px;
    bottom: 0;
    ${(props): string => {
      if (props.sticker) {
        return 'none'
      }

      return 'border-bottom: 1px solid' + props.isMe ? get.colors(props).greenOffset : '#fff'
    }};
    width: 16px;
    height: 10px;
    z-index: 1;
    clip-path: ${(props): string => {
      if (props.sticker) {
        return 'none'
      }

      return props.isMe ? 'url(#right-droplet)' : 'url(#left-droplet)'
    }};
  }
`
export const Image = styled.img`
  top: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  min-width: ${(props): string => props.width + 'px'};
  min-height: ${(props): string => props.height + 'px'};
  border-top-left-radius: ${(props): string => get.radius(props).tiny};
  border-top-right-radius: ${(props): string => get.radius(props).tiny};
`

export const LoadingWrapper = styled.div`
  width: ${(props): string => props.width + 'px'};
  height: ${(props): string => props.height + 'px'};
  display: flex;
  justify-content: center;
  align-items: center;
`
