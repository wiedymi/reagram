import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { authStyles } from '@/components/common'
import { styleHelpers as get } from '@/helpers'

const flex = css`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-content: center;
  align-items: center;
`
export const Title = styled(authStyles.Title)`
  margin-bottom: 0px !important;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
`

export const Subtitle = styled(authStyles.Subtitle)`
  margin-bottom: 0px !important;
  width: 100% !important;
`

export const Menu = styled.div`
  padding: ${(props): string => get.padding(props).tiny};
  ${flex}
  flex-flow: column;
  margin-top: ${(props): string => get.margin(props).normal};
`

export const hoverableClick = function(evt): void {
  const hoverable = evt.currentTarget

  const x = evt.clientX - hoverable.offsetLeft
  const y = evt.clientY - hoverable.offsetTop

  const span = document.createElement('span')
  span.style.left = `${x}`
  span.style.top = `${y}`

  hoverable.appendChild(span)
}

export const Hoverable = styled.div`
  ${flex}
  position: relative;
  overflow: hidden;
  &:hover {
    border-radius: 10px;
    background-color: #f4f4f5;
    cursor: pointer;
  }
  span {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);

    width: 100px;
    height: 100px;

    animation: ripple 1s;
    opacity: 0;
  }

  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }
    to {
      opacity: 0;
      transform: scale(10);
    }
  }
`
export const Option = styled.div`
  ${flex}
  padding: ${(props): string => get.padding(props).tiny};
`

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${({ src }): string => src});
  background-repeat: no-repeat;
  background-position: center;
`

export const Text = styled.p`
  font-size: 1.1rem;
  margin-left: ${(props): string => get.margin(props).normal};
`
