import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  height: 2px;
  cursor: pointer;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`

export const Meter = styled.span`
  height: 100%;
  position: relative;

  width: ${({ value }): string => value + '%'};
  min-width: ${({ value }): string => value + '%'};
  height: 2px;
  background-color: ${(props): string => get.colors(props).primary};
`

export const Circle = styled.div`
  background: ${(props): string => get.colors(props).primary};
  width: 10px;
  height: 10px;

  top: -4px;
  position: absolute;
  right: -5px;
  border-radius: ${(props): string => get.radius(props).around};
`

export const Line = styled.span`
  width: 100%;
  height: 2px;
  background-color: #0000002e;
`
