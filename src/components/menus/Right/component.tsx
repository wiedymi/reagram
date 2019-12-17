import React, { ReactNode, useState } from 'react'
import { getChatInfo } from '@/telegram/hooks'
import { createViewController } from '@/helpers'
import { RIGHT_MENU } from '@/constants'
import * as C from '@/components/common'
import * as Sub from '@/components/SubRightMenu'
import * as S from './styles'

type Props = {
  children: ReactNode
}

const isHidden = (toggle, chatId): boolean => {
  if (toggle) {
    return toggle
  }

  return chatId === 0
}

const Views = createViewController({
  [RIGHT_MENU.CHAT_INFO]: Sub.ChatInfo,
  [RIGHT_MENU.CHANNEL_INFO]: Sub.ChannelInfo,
})

const RightMenu = (props: Props): ReactNode => {
  const { data, loading, refetch } = getChatInfo({ chatId: props.openedChat })
  const [view, changeView] = useState(RIGHT_MENU.CHAT_INFO)

  if (!loading && data.id !== props.openedChat) {
    refetch()
  }

  if (loading) {
    return (
      <S.Wrapper hidden={isHidden(props.hidden, props.openedChat)}>
        <C.Loading message="Loading info..." />
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper hidden={isHidden(props.hidden, props.openedChat)}>
      <Sub.Header chatInfo={data} {...props} />
      <Views view={view} changeView={changeView} chatInfo={data} {...props} />
      <Sub.Media chatInfo={data} {...props} />
    </S.Wrapper>
  )
}

export default RightMenu
