import React, { ReactNode } from 'react'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import { Wrapper } from './styles'

const { GET_CONTACTS } = USE_TELEGRAM

const Contacts = (): ReactNode => {
  const { loading, data } = useTelegram(GET_CONTACTS)

  if (loading) {
    return <Wrapper>Loading contacts</Wrapper>
  }
  const { totalCount, users } = data
  console.log(data)
  return (
    <Wrapper>
      {totalCount === 0
        ? 'No contacts'
        : users.map(user => {
            return <div key={user.id}>{user.firstName}</div>
          })}
    </Wrapper>
  )
}

export default Contacts
