import styled from '@emotion/styled'
import { Forum as ForumIcon } from '@material-ui/icons'
import { styleHelpers as get } from '@/helpers'

export const Forum = styled(ForumIcon)`
  font-size: 9rem !important;
  color: ${(props): string => get.colors(props).iconOffset} !important;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`
export const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.4s ease-out;
  :hover > div {
    background-color: ${(props): string => get.colors(props).primary};
  }
  :hover > p {
    color: ${(props): string => get.colors(props).primary};
  }
  i {
    filter: opacity(0.5);
  }
  :hover i {
    /* background-color: ${(props): string => get.colors(props).white}; */
  }
`

export const Subtitle = styled.p`
  margin-top: 10px;
  color: ${(props): string => get.colors(props).icon};
`

export const Circle = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  margin: 0px 30px;
  border-radius: ${(props): string => get.radius(props).around};
  justify-content: center;
  align-items: center;
  background-color: ${(props): string => get.colors(props).white};
`
export const OptionsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`

export const Title = styled.h4`
  font-size: 20px;
  max-width: 220px;
  text-align: center;
  margin: 20px 0;
  font-weight: 600;
  color: ${(props): string => get.colors(props).icon};
`
