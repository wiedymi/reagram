import React, { ReactNode, useState, useEffect } from 'react'
import { AUTH_FORM } from '@/constants'
import { telegram, createAuthForm, authorizationStateWaitCode } from '@/helpers'
import { Wrapper, Img, Content, Input, Title, Subtitle, NextStageButton } from './styles'

type Props = {
  children: ReactNode
  state: any
  name: string
  type: string
  value: string
  handleChange(): void
  handleClick(): void
}

const CodeForm = (props: Props) => {
  const { name, type, value, handleChange, handleClick, state } = props
  if (!state.phone) {
    return telegram.logout()
  }

  useEffect(() => {
    if (value.length === 5) {
      handleClick()
    }
  }, [value, handleClick])
  const validate = ({ target }) => {
    const code = target.value

    handleChange({
      target: {
        value: code,
      },
    })
  }

  return (
    <Wrapper>
      <Img src="/assert/logo.png" />
      <Content>
        <Title variant="h4">+{state.phone}</Title>
        <Subtitle>We have sent you an SMS with code</Subtitle>
        <Input
          name={name}
          type="text"
          value={value}
          onChange={validate}
          label={`Code`}
          variant="outlined"
        />
      </Content>
    </Wrapper>
  )
}

export default createAuthForm(AUTH_FORM.CODE, authorizationStateWaitCode, CodeForm)
