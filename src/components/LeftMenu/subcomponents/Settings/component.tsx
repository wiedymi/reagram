import React, { ReactNode } from 'react'
import { SelectImage } from '@/components/base'
import { Loading } from '@/components/common'
import { useTelegram, USE_TELEGRAM, getImageFile } from '@/helpers'
import { TYPES } from '@/constants'
import { Wrapper, Title, Subtitle } from './styles'

const { GET_AVATARS_CHATS } = USE_TELEGRAM

type Props = {
  children: ReactNode;
}

const Settings = (props: Props): ReactNode => {
  const { id } = props.me.profilePhoto.big
  const { firstName, phoneNumber } = props.me
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
  }
  const { loading, data, refetch } = useTelegram(GET_AVATARS_CHATS, query)

  const image = !loading && data ? getImageFile(id, data.files, refetch) : ''

  if (loading) {
    return <Loading message="Loading settings..." />
  }

  return (
    <Wrapper>
      <SelectImage hidden image={image} />
      <Title variant="h5">{firstName}</Title>
      <Subtitle>+{phoneNumber}</Subtitle>
    </Wrapper>
  )
}

export default Settings
