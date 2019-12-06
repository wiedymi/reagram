import React, { ReactNode } from 'react'
import * as B from '@/components/base'
import * as S from './styles'

const Component = ({ username }: EditProfileType): ReactNode => {
  return (
    <S.Wrapper>
      <S.Title>Username</S.Title>
      <B.Input
        type="text"
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
