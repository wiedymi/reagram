import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`
export const ChatWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  flex-flow: column;
`

export const ChatHoverable = styled.div`
  &:hover {
    border-radius: 20px;
    background-color: #f4f4f5;
    cursor: pointer;
  }
`
