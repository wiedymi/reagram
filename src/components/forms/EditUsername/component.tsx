import React, { ReactNode, useState, useCallback } from 'react'
import * as C from '@/components/common'
import * as S from './styles'

const Component = (props: EditProfileType): ReactNode => {
  const [username, setUsername] = useState(props.username)

  const handleChnage = useCallback(
    ({ target }) => {
      setUsername(target.value)
    },
    [setUsername],
  )
  return (
    <S.Wrapper>
      <S.Title>Username</S.Title>
      <C.Input
        type="text"
        onChange={handleChnage}
        value={username}
        label={`Username`}
        variant="outlined"
        fluid
        helperText="You can choose a username on Telegram. If you do, other people will be able to find you by this username and contact you without knowing your phone number."/>
      <S.Text>You can use a-z, 0-9 and underscores. Minimum length is 5 characters.</S.Text>
      <S.LinkShare>
        The link opens a chat with you:
        <a href={'https://t.me/' + username}>https://t.me/{username}</a>
      </S.LinkShare>
    </S.Wrapper>
  )
}

export default Component
