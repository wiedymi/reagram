import React, { ReactNode, useState, useCallback } from 'react'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import * as C from '@/components/common'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const ChatController = (props: Props): ReactNode => {
  const [message, setMessage] = useState()
  const [sendTextMessage] = useTelegram(USE_TELEGRAM.SEND_TEXT_MESSAGE)

  const handleChange = ({ target }): void => {
    setMessage(target.value)
  }

  const handleClick = useCallback(async (): void => {
    const query = {
      chatId: props.chatId,
      message,
    }

    const data = await sendTextMessage(query)

    props.refetch()
  }, [props, message, sendTextMessage])

  return (
    <S.Wrapper>
      <S.InputController>
        <C.Icon image="smile_svg.svg" sizeIcon="1rem" />
        <S.Input placeholder="Message" value={message} onChange={handleChange} />
        <C.Icon image="attach_svg.svg" sizeIcon="1rem" />
      </S.InputController>
      <S.SendButton onClick={handleClick}>
        {message ? (
          <C.Icon image="send_svg.svg" sizeIcon="1rem" />
        ) : (
          <C.Icon image="microphone_svg.svg" sizeIcon="1rem" />
        )}
      </S.SendButton>
    </S.Wrapper>
  )
}

export default ChatController
