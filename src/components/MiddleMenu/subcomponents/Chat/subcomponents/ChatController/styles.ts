import styled from '@emotion/styled'
import { styleHelpers as get } from '@/helpers'
export const Wrapper = styled.div`
  display: flex;
  padding: ${(props): string => get.padding(props).normal}
    ${(props): string => get.padding(props).tiny};
  justify-content: center;
  min-height: 60px;
  align-items: center;
`

export const InputController = styled.div`
  width: 80%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 0 ${(props): string => get.padding(props).tiny};
  border-radius: ${(props): string => get.radius(props).tiny};
  &:before {
    position: absolute;
    content: '';
    bottom: 0;
    height: 1px;
    z-index: 1;
    background-color: #fff !important;
    box-shadow: none !important;
    right: -6px !important;
    width: 20px !important;
  }
  &:after {
    position: absolute;
    content: '';
    background: white;
    right: -10px;
    bottom: 0;
    border-bottom: 1px solid #fff;
    width: 16px;
    height: 10px;
    z-index: 1;
    clip-path: url(#right-droplet);
  }
`
export const Input = styled.input`
  border: 0;
  height: 100%;
  padding: ${(props): string => get.padding(props).small};
  resize: none;
  width: 100%;
  &:focus {
    outline: none;
  }
`

export const SendButton = styled.button`
  width: 40px;
  margin-left: ${(props): string => get.margin(props).tiny};
  height: 40px;
  border: 0;
  border-radius: ${(props): string => get.radius(props).around};
  color: #fff;
  background: ${(props): string => get.colors(props).primary};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
