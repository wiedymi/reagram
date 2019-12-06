import styled from '@emotion/styled'
import { Typography, TextField, Button, MenuItem } from '@material-ui/core'
import { styleHelpers as get } from '@/helpers'

export const SelectItem = styled(MenuItem)``

export const Wrapper = styled.div`
  display: flex;
  transition: all 0.8s ease-out;
  justify-content: center;
  align-items: center;
  min-height: ${({ nextStageButton }): string => (nextStageButton ? '90vh' : '80vh')};
  flex-wrap: nowrap;
  flex-flow: column;

  .MuiSelect-root.MuiSelect-select {
    > div > div > span {
      display: none;
    }
    > div > p.MuiTypography-root {
      display: none;
    }
  }
`
export const Img = styled.img`
  display: flex;
  width: 180px;
  justify-items: center;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props): string => get.padding(props).normal};
  flex-wrap: nowrap;
  flex-flow: column;
`

export const Input = styled(TextField)`
  margin-top: 20px !important;
  & label.Mui-focused {
    color: ${(props): string => get.colors(props).primary};
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  & .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => get.colors(props).primary};
  }

  & .MuiOutlinedInput-root {
    width: 360px !important;
    border-radius: ${(props): string => get.radius(props).tiny};
    & fieldset {
      border-color: ${(props): string => get.colors(props).offset};
    }

    &:hover fieldset {
      border-color: ${(props): string => get.colors(props).black};
    }

    &.Mui-focused fieldset {
      border-color: ${(props): string => get.colors(props).primary};
    }
  }
`
export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px !important;
  margin-bottom: ${(props): string => get.margin(props).tiny} !important;
`

export const Subtitle = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7d7d7d;
  width: 240px;
  justify-content: center;
  text-align: center;
  margin-bottom: 30px !important;
`

export const Flag = styled.span`
  margin-right: ${(props): string => get.margin(props).tiny};
`

export const CountryName = styled(Typography)``

export const CountryCode = styled(Typography)`
  color: #7d7d7d;
  margin-right: ${(props): string => get.margin(props).tiny} !important;
`

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const CountryWrapper = styled.div`
  display: flex;
`

export const NextStageButton = styled(Button)`
  pointer-events: ${(props): string => {
    if (props.nextStageButton) {
      return 'auto'
    }
    return 'none'
  }};
  opacity: ${(props): string => {
    if (props.nextStageButton) {
      return 1
    }
    return 0
  }};
  text-transform: uppercase;
  width: 100%;
  border-radius: ${(props): string => get.margin(props).tiny} !important;
  padding: ${(props): string => get.padding(props).small} !important;
  margin-top: 20px !important;
  background-color: ${(props): string => get.colors(props).primary} !important;
`
