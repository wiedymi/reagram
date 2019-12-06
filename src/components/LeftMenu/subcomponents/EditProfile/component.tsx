import React, { ReactNode } from 'react'
import { SelectImage } from '@/components/base'
import { Loading } from '@/components/common'
import { EditProfile, EditUsername } from '@/components/forms'
import { useTelegram, USE_TELEGRAM, getImageFile } from '@/helpers'
import { TYPES } from '@/constants'
import * as S from './styles'

const { GET_AVATARS_CHATS } = USE_TELEGRAM

type Props = {
  children: ReactNode
}

const Component = (props: Props): ReactNode => {
  const { id } = props.me.profilePhoto.big
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
  }
  const { loading, data, refetch } = useTelegram(GET_AVATARS_CHATS, query)

  const image = !loading && data ? getImageFile(id, data.files, refetch) : ''

  if (loading) {
    return <Loading message="Loading..." />
  }

  return (
    <S.Wrapper>
      <SelectImage image={image} select />
      <EditProfile {...props.me} />
      <hr />
      <EditUsername {...props.me} />
    </S.Wrapper>
  )
}

export default Component
