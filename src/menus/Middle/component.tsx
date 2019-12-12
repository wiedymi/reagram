import React, { ReactNode, useState, useEffect } from 'react'
import { MIDDLE_MENU } from '@/constants'
import { createViewController } from '@/helpers'
import * as Sub from '@/components/SubMiddleMenu'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const Views = createViewController({
  [MIDDLE_MENU.CHAT.OPENED]: Sub.Chat,
  [MIDDLE_MENU.NO_SELECTED_CHAT]: Sub.NoSelectedChat,
})

const MiddleMenu = (props: Props): ReactNode => {
  const [view, changeView] = useState(MIDDLE_MENU.NO_SELECTED_CHAT)

  useEffect(() => {
    if (props.openedChat !== 0) {
      changeView(MIDDLE_MENU.CHAT.OPENED)
    }
  }, [view, props])

  return (
    <S.Wrapper>
      <Views view={view} changeView={changeView} {...props} />
    </S.Wrapper>
  )
}

export default MiddleMenu
