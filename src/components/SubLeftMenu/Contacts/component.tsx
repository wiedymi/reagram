import React, { ReactNode } from 'react'
import { CardHeader, Avatar } from '@material-ui/core'
import { getImageFile } from '@/helpers'
import { getAvatar, getContacts } from '@/telegram/hooks'
import { TYPES } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

type ContactType = {
  profilePhoto: object;
  firstName: string;
}

const Contact = (props: ContactType): ReactNode => {
  const query = {
    id: props.profilePhoto.big.id,
    type: TYPES.FILES.PHOTO,
  }
  const { data, loading, refetch } = getAvatar(query)

  const avatar =
    !loading && data ? getImageFile(props.profilePhoto.big.id, data.files, refetch) : ''
  const { firstName } = props

  return (
    <S.ChatWrapper>
      <S.ChatHoverable>
        <CardHeader
          avatar={
            loading ? (
              <Avatar aria-label="recipe">{firstName.charAt(0).toUpperCase()}</Avatar>
            ) : (
              <S.OnlineBadge
                overlap="circle"
                variant="dot"
                color="primary"
                anchorOrigin={{
                  horizontal: 'right',
                  vertical: 'bottom',
                }}
              >
                <Avatar aria-label="recipe" src={avatar} />
              </S.OnlineBadge>
            )
          }
          title={firstName}
          subheader={'Last seen'}/>
      </S.ChatHoverable>
    </S.ChatWrapper>
  )
}

const Contacts = (): ReactNode => {
  const { loading, data } = getContacts()

  if (loading) {
    return <C.Loading message="Loading contacts..." />
  }
  const { totalCount, users } = data

  return (
    <S.Wrapper>
      {totalCount === 0 ? (
        <C.Loading message="No contacts" error />
      ) : (
        users.map(user => {
          return <Contact key={user.id} {...user} />
        })
      )}
    </S.Wrapper>
  )
}

export default Contacts
