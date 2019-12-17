import styled from '@emotion/styled'
import { authStyles } from '@/components/common'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${(props): string => get.padding(props).small};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Title = styled(authStyles.Title)`
  margin-bottom: 0px !important;
  font-weight: 600 !important;
  font-size: 1.4rem !important;
  margin-top: ${(props): string => get.margin(props).normal} !important;
`

export const Subtitle = styled(authStyles.Subtitle)`
  margin-bottom: 0px !important;
  width: 100% !important;
  color: ${(props): string => !props.type && get.colors(props).primary};
`

export const Circle = styled.div`
  background-color: ${(props): string => {
    if (!props.image) {
      return get.colors(props).primary
    }
  }} !important;
  background-image: url(${({ image }): string => image});
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 40px;
  margin: ${(props): string => get.margin(props).tiny};
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
`

export const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: ${(props): string => get.margin(props).normal} 0px;
  padding: 0px 5px;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: ${(props): string => get.margin(props).tiny} 0px;
  .MuiSvgIcon-root {
    color: ${(props): string => get.colors(props).blackOffset};
  }
  .MuiCheckbox-root {
    padding: 0 !important;
    color: ${(props): string => get.colors(props).primary} !important;
    .MuiSvgIcon-root {
      color: ${(props): string => get.colors(props).primary} !important;
    }
  }
`

export const DetailTitle = styled.h4`
  font-weight: 600;
`

export const DetailSubtitle = styled.p`
  color: ${(props): string => get.colors(props).blackOffset};
`

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props): string => get.margin(props).small};
`
