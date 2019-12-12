import React, { ReactNode, useState } from 'react'
import * as C from '@/components/common'
import * as S from './styles'

const EditProfile = ({ firstName, lastName, bio }: EditProfileType): ReactNode => {
  const [state, setState] = useState({
    firstName,
    lastName,
    bio,
  })

  const handleChange = (field, value): void => {
    setState({
      ...state,
      [field]: value,
    })
  }

  return (
    <S.Wrapper>
      <C.Input
        type="text"
        value={state.firstName}
        label={`First Name`}
        variant="outlined"
        fluid
        onChange={({ target }): void => handleChange('firstName', target.value)}/>
      <C.Input
        type="text"
        value={state.lastName}
        label={`Last Name`}
        variant="outlined"
        fluid
        onChange={({ target }): void => handleChange('lastName', target.value)}/>
      <C.Input
        type="text"
        value={state.bio}
        label={`Bio`}
        variant="outlined"
        onChange={({ target }): void => handleChange('bio', target.value)}
        placeholder="Bio (Optional)"
        fluid
        helperText="Any details such as age, occupation or city. Example: 23 y.o. designer from San Francisco"/>
    </S.Wrapper>
  )
}

export default EditProfile
