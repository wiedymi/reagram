import React, { ReactNode, useState, useCallback } from 'react'
import { ArrowForward } from '@material-ui/icons'
import { createGroup } from '@/telegram/hooks'
import { LEFT_MENU } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

type ICreateGroup = {
  children: ReactNode;
}

const CreateGroup = (props: ICreateGroup): ReactNode => {
  const [createNewGroup] = createGroup()
  const [state, setState] = useState({
    title: '',
    userIds: [],
    image: null,
  })

  const handleClick = useCallback(async (): void => {
    const { success, error } = await createNewGroup(state)
    if (success) {
      props.openChat(success.id)
      props.changeView(LEFT_MENU.CHATS)
    }

    if (error) {
      alert(error)
    }
  }, [props, createNewGroup, state])

  const handleChange = type => ({ target: { value } }): void => {
    setState({
      ...state,
      [type]: value,
    })
  }

  return (
    <S.Wrapper>
      <C.SelectImage />
      <C.Input
        type="text"
        value={state.title}
        onChange={handleChange('title')}
        label={`Group Name`}
        variant="outlined"
        fluid/>
      <S.Button onClick={handleClick}>
        <ArrowForward />
      </S.Button>
    </S.Wrapper>
  )
}

export default CreateGroup
