import React, { ReactNode } from 'react'
import { useTelegram, USE_TELEGRAM, getImageFile, nFormatter } from '@/helpers'
import { TYPES } from '@/constants'
import * as S from './styles'

type Props = {
  children: ReactNode
}

const Menu = ({ chatInfo }: Props): ReactNode => {
  const { id } = chatInfo.photo ? chatInfo.photo.big : { id: 0 }
  const { isChannel, supergroupId } = chatInfo.type
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
  }
  const { data, loading, refetch, storage } = useTelegram(USE_TELEGRAM.GET_AVATARS_CHATS, query)
  const { me } = storage.getState()
  let avatar = !loading && data ? getImageFile(id, data.files, refetch) : ''
  let { title } = chatInfo
  let isSaved = false
  if (me && chatInfo.id === me.id) {
    title = 'Saved Messages'
    avatar = '/icons/savedmessages_svg.svg'
    isSaved = true
  }

  const typeMembers = isChannel && supergroupId ? ' subsribers' : ' members'

  return (
    <S.Wrapper isSaved={isSaved}>
      <S.Header
        avatar={
          loading ? (
            <S.Avatar aria-label="recipe">{title.charAt(0).toUpperCase()}</S.Avatar>
          ) : (
            <S.Avatar aria-label="recipe" src={avatar} />
          )
        }
        title={title}
        subheader={supergroupId ? nFormatter(chatInfo.memberCount) + typeMembers : 'Online'}
      />
    </S.Wrapper>
  )
}

export default Menu
