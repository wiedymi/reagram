import React, { ReactNode } from 'react'
import * as C from '@/components/common'
import { EditProfile, EditUsername } from '@/components/forms'
import { getImageFile } from '@/helpers'
import { getAvatar } from '@/telegram/hooks'
import { TYPES } from '@/constants'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const Component = (props: Props): ReactNode => {
  const { id } = props.me.profilePhoto.big
  const query = {
    id,
    type: TYPES.FILES.PHOTO,
  }
  const { loading, data, refetch } = getAvatar(query)

  const image = !loading && data ? getImageFile(id, data.files, refetch) : ''

  if (loading) {
    return <C.Loading message="Loading..." />
  }

  return (
    <S.Wrapper>
      <C.SelectImage image={image} select />
      <EditProfile {...props.me} />
      <hr />
      <EditUsername {...props.me} />
    </S.Wrapper>
  )
}

export default Component
