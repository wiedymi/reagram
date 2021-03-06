import React, { ReactNode, useState, useCallback } from 'react'
import { ArrowForward } from '@material-ui/icons'
import { createChannel } from '@/telegram/hooks'
import * as C from '@/components/common'
import { LEFT_MENU } from '@/constants'
import * as S from './styles'

type ICreateNewChannel = {}

const CreateNewChannel = (props: ICreateNewChannel): ReactNode => {
  const [createNewChannel] = createChannel()
  const [state, setState] = useState({
    title: '',
    description: '',
    image: null,
  })

  const handleClick = useCallback(async (): void => {
    const { success, error } = await createNewChannel(state)
    if (success) {
      props.openChat(success.id)
      props.changeView(LEFT_MENU.CHATS)
    }

    if (error) {
      alert(error)
    }
  }, [props, createNewChannel, state])

  const handleChange = type => ({ target: { value } }): void => {
    setState({
      ...state,
      [type]: value,
    })
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
        fluid
      />
      <C.Input
        type="text"
        value={state.description}
        onChange={handleChange('description')}
        label={`Description`}
        variant="outlined"
        placeholder="Description (Optional)"
        fluid
        helperText="You can provide an optional description for your channel."
      />
      <S.Button onClick={handleClick}>
        <ArrowForward />
      </S.Button>
    </S.Wrapper>
  )
}

export default CreateNewChannel
