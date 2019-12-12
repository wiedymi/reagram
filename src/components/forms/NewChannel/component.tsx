import React, { ReactNode, useState } from 'react'
import { useTelegram, USE_TELEGRAM } from '@/helpers'
import * as C from '@/components/common'
import * as S from './styles'

const { CREATE_CHANNEL } = USE_TELEGRAM

const CreateGroup = (): ReactNode => {
  const [createNewChannel] = useTelegram(CREATE_CHANNEL)
  const [state, setState] = useState({
    title: '',
    description: '',
    image: null,
  })

  const handleChange = type => ({ target: { value } }): void => {
    setState({
      ...state,
      [type]: value,
    })
  }

  const handleClick = async (): void => {
    console.log(state)
    const result = await createNewChannel(state)

    console.log(result)
  }

  return (
    <S.Wrapper>
      <C.SelectImage getImage={handleChange('image')} />
      <C.Input
        type="text"
        value={state.title}
        onChange={handleChange('title')}
        label={`Channel Name`}
        variant="outlined"
        fluid/>
      <C.Input
        type="text"
        value={state.description}
        onChange={handleChange('description')}
        label={`Description`}
        variant="outlined"
        placeholder="Description (Optional)"
        fluid
        helperText="You can provide an optional description for your channel."/>
      <button onClick={handleClick}>Next</button>
    </S.Wrapper>
  )
}

export default CreateGroup
