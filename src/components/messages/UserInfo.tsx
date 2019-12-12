import React, { ReactNode } from 'react'
import { getImageFile, useTelegram, USE_TELEGRAM } from '@/helpers'
import { TYPES } from '@/constants'
import * as S from './styles'

type IUserInfo = {
  children: ReactNode;
}

const Component = (props: IUserInfo): ReactNode => {
  const {
    profilePhoto: {
      big: { id },
    },
  } = props.user

  const query = {
    id,
    type: TYPES.FILES.PHOTO,
    priority: 1,
  }
  const { data, loading, refetch } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)

  const avatar = !loading && data ? getImageFile(id, data.files, refetch) : ''

  const handleClick = (): void => {
    props.openChat(props.user.id)
  }

  return (
    <S.UserInfo onClick={handleClick}>
      <S.UserAvatar image={avatar} />
    </S.UserInfo>
  )
}

export default Component
