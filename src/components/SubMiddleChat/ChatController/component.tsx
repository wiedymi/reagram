import React, { ReactNode, useState, useCallback } from 'react'
import { sendTextMessage, getStickers } from '@/telegram/hooks'
import * as C from '@/components/common'
import * as S from './styles'

type Props = {
  children: ReactNode
}

const ChatController = (props: Props): ReactNode => {
  const [message, setMessage] = useState()
  const [sendText] = sendTextMessage()
  const [getStickerSets] = getStickers()

  const handleChange = ({ target }): void => {
    setMessage(target.value)
  }

  const handleClick = useCallback(async (): void => {
    const query = {
      chatId: props.chatId,
      message,
    }

    const { success, error } = await sendText(query)

    if (success) {
      console.log(success)
    }

    if (error) {
      alert(error)
    }
  }, [props, message, sendText])

  const handleClickSticker = async (): void => {
    const res = await getStickerSets()

    console.log(res)
  }

  return (
    <S.Wrapper>
      <S.InputController>
        <C.Icon image="smile_svg.svg" sizeIcon="1rem" onClick={handleClickSticker} />
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
