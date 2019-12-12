import styled from '@emotion/styled'
import { css } from '@emotion/core'
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
const messageFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Message = styled.p`
  ${({ flex }): string => flex && messageFlex};
  padding: ${(props): string => get.padding(props).tiny};
  width: 100%;
  padding-right: 60px;
  max-width: ${({ width }): string => width + 'px'};
`
export const Status = styled.div``

const imageTime = css`
  z-index: 101;
  border-radius: 5px;
  padding: 2px 6px;
  background: #00000070;
  color: #fff;
  margin: 5px;
`

export const Date = styled.p`
  font-size: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 323;
  margin-right: 5px;
  max-height: ${({ withoutText, image }): string => {
    if (withoutText && image) {
      return imageTime
    }
  }};
`

export const MessageBubble = styled.div`
  margin-top: ${(props): string => get.padding(props).small};
  max-height: ${({ withoutText, height }): string => {
    if (withoutText) {
      return height + 'px'
    }
  }};

  position: relative;
  display: flex;
  flex-direction: column;
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
    display: ${(props): string => {
      return props.withoutText && 'none'
    }};
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
      return props.withoutText && 'display: none'
    }};
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
  position: inherit;
  overflow: hidden;
  min-width: ${(props): string => props.width + 'px'};
  min-height: ${(props): string => props.height + 'px'};
  border-top-left-radius: ${(props): string => get.radius(props).tiny};
  border-top-right-radius: ${(props): string => get.radius(props).tiny};
  border-radius: ${(props): string => {
    if (!props.withoutText) {
      return get.radius(props).tiny
    }
  }};
`

export const LoadingWrapper = styled.div`
  min-width: ${(props): string => props.width + 'px'};
  min-height: ${(props): string => props.height + 'px'};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const PlayButton = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props): string =>
    !props.isMe ? get.colors(props).primary : get.colors(props).green};
  border-radius: ${(props): string => get.radius(props).around};
  cursor: pointer;
  > div {
    display: flex;
    height: 50px !important;
    width: 50px !important;
    align-items: center !important;
    justify-content: center !important;
    i {
      height: 28px !important;
      width: 28px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
  }
`

export const AudioLoadingText = styled.p``

export const AudioTitle = styled.b``

export const AudioSubtitle = styled.p`
  font-size: 14px;
  color: ${(props): string =>
    props.isMe ? get.colors(props).green : get.colors(props).blackOffset};
`

export const AudioInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props): string => get.padding(props).tiny};
`
export const Animation = styled.video`
  border-radius: ${(props): string => get.radius(props).tiny};
`
export const UserInfo = styled.div`
  position: absolute;
  left: -50px;
  bottom: 0;
  cursor: pointer;
`

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  background-color: ${(props): string => get.colors(props).primary};
  background-image: url(${({ image }): string => image});
  border-radius: 50%;
  background-size: contain;
`
