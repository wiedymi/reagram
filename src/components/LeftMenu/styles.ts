import styled from '@emotion/styled'
import Item from '@material-ui/core/MenuItem'
import FabUi from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import { styleHelpers } from '@/helpers'

const { getColors } = styleHelpers

export const Wrapper = styled.div`
  display: flex;
  width: 380px;
  height: 100vh;
  max-height: 100vh;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  flex-flow: column;
  position: relative !important;
`

export const Fab = styled(FabUi)`
  position: absolute !important;
  right: 30px !important;
  bottom: 20px !important;
  max-width: 50px !important;
  max-height: 50px !important;
  box-shadow: none !important;

  background-color: ${(props): string => getColors(props).primary}!important;
`
export const ChannelIcon = styled.span`
  width: 24px;
  height: 24px;
  background-image: url('/icons/channel_svg.svg');
`
export const AddIcon = styled(Add)``
export const CloseIcon = styled(Close)``

export const MenuItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-content: center;
`
export const IconWrapper = styled.div`
  display: flex;
  margin-right: 20px !important;
  /* .MuiSvgIcon-root {
    color: ${(props): string => getColors(props).offset}!important;
  } */
`
