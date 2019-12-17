import styled from '@emotion/styled'
import tabs from '@material-ui/core/Tabs'
import tab from '@material-ui/core/Tab'
import { styleHelpers as get } from '@/helpers'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid ${(props): string => get.colors(props).blackOffset};
`

export const Tabs = styled(tabs)`
  overflow-x: auto !important;
  .MuiTabs-indicator {
    background-color: ${(props): string => get.colors(props).primary} !important;
    border: 2px solid ${(props): string => get.colors(props).primary} !important;

    border-radius: 50px 50px 0px 0px !important;
  }
`

export const Tab = styled(tab)`
  padding: 0 !important;
  max-width: 60px !important;
  min-width: 80px !important;
  overflow: hidden !important;
`
