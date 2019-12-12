import React, { ReactNode, useEffect } from 'react'
import { authStyles, Input } from '@/components/common'
import { AUTH_FORM } from '@/constants'
import { telegram, createAuthForm, authorizationStateWaitCode } from '@/helpers'

const { Wrapper, Img, Content, Title, Subtitle } = authStyles

type Props = {
  children: ReactNode
  state: Any
  name: string
  type: string
  value: string
  handleChange(): void
  handleClick(): void
}

const CodeForm = (props: Props): void => {
  const { name, value, handleChange, handleClick, state } = props

  useEffect(() => {
    if (value.length === 5) {
      handleClick()
    }
  }, [value, handleClick])

  if (!state.phone) {
    return telegram.logout()
  }

  const validate = ({ target }): void => {
    const code = target.value

    handleChange({
      target: {
        value: code,
      },
    })
  }

  return (
    <Wrapper>
      <Img src="/assert/monkey1.png" />
      <Content>
        <Title variant="h4">
          +{state.phone} <button onClick={async (): void => await telegram.logout()}>Edit</button>
        </Title>
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
