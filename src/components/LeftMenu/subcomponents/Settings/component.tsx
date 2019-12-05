import React, { ReactNode } from 'react'
import { SelectImage } from '@/components/base'
import { useTelegram, USE_TELEGRAM, toImage } from '@/helpers'
import { TYPES } from '@/constants'
import { Wrapper, Title, Subtitle } from './styles'

const { GET_AVATARS_CHATS } = USE_TELEGRAM

type Props = {
  children: ReactNode
}

const getAvatar = (id, blobs, refetch): string => {
  if (!id) {
    return ''
  }

  const photo = blobs.filter(blob => {
    return blob.id === id
  })

  if (photo.length === 0) {
    return refetch()
  }

  const [source] = photo

  return toImage(source.blob)
}

const Settings = (props: Props): ReactNode => {
  const { id } = props.me.profilePhoto.big
  const { firstName, phoneNumber } = props.me
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
  }
  const { loading, data, refetch } = useTelegram(GET_AVATARS_CHATS, query)

  const image = !loading && data ? getAvatar(id, data.files, refetch) : ''

  return (
    <Wrapper>
      <SelectImage hidden image={image} />
      <Title variant="h5">{firstName}</Title>
      <Subtitle>+{phoneNumber}</Subtitle>
    </Wrapper>
  )
}

Settings.defaultProps = {
  // bla: 'test',
}

export default Settings
