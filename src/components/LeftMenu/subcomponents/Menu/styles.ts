import styled from '@emotion/styled'
import Item from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FabUi from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import { Typography } from '@material-ui/core'
import { styleHelpers } from '@/helpers'
import { LEFT_MENU } from '@/constants'

const { getColors } = styleHelpers

export const Fab = styled(FabUi)`
  position: absolute;
  bottom: -90vh;
  right: 10px;
  min-width: 50px !important;
  max-height: 50px !important;
  background-color: ${(props): string => getColors(props).primary}!important;
`
export const AddIcon = styled(Add)``

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-content: center;
  position: relative;
  font-size: 1.1rem;
`

export const IconWrapper = styled.div`
  display: flex;
  margin-right: 20px !important;
`

export const MenuItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-content: center;
`

export const LeftNav = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 40px;
  width: 40px;
  .MuiSvgIcon-root {
    color: #707579 !important;
  }

  .MuiIconButton-root {
    max-width: 40px !important;
    max-height: 40px !important;
    padding: 0px ${({ view }): string => (view === LEFT_MENU.SETTINGS ? '0px' : '10px')} 0px 10px;
  }
`
export const RightNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: 40px;
  max-height: 40px;
  width: 100%;
  padding: 0px ${({ view }): string => (view === LEFT_MENU.SETTINGS ? '0px' : '5px')} 0px 5px;
  .MuiSvgIcon-root {
    color: #adb3b7 !important;
  }
  .MuiIconButton-root {
    max-width: 40px !important;
    max-height: 40px !important;
    height: 40px;
    width: 40px;
    padding: 0;
  }
`

export const Input = styled(OutlinedInput)`
  width: 100%;
  background: #f4f4f5 !important;
  border-radius: 30px !important;
  max-height: 40px !important;
  border: 0 !important;
  fieldset {
    border-radius: 30px !important;
  }

  label.Mui-focused {
    color: ${(props): string => getColors(props).primary};
  }
  .MuiSelect-select:focus {
    background-color: #fff !important;
  }

  .MuiInput-underlineafter {
    border-bottom-color: ${(props): string => getColors(props).primary};
  }

  fieldset {
    border-color: ${(props): string => getColors(props).offset};
    border: 0;
  }

  &:hover fieldset {
    border: 1px solid ${(props): string => getColors(props).black};
  }

  .Mui-focused fieldset {
    border-color: ${(props): string => getColors(props).primary};
  }
`

export const Title = styled(Typography)`
  display: flex;
  font-weight: bold !important;
  /* justify-content: center;
  align-items: center; */
`
