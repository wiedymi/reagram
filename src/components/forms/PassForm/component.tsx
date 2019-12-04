import React, { ReactNode, useState, useEffect } from 'react'
import { AUTH_FORM } from '@/constants'
import { createAuthForm, authorizationStateWaitPassword } from '@/helpers'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import {
  Wrapper,
  InputWrapper,
  Img,
  Content,
  Input,
  Title,
  Subtitle,
  NextStageButton,
} from './styles'

type Props = {
  children: ReactNode
  state: any
  name: string
  type: string
  value: string
  handleChange(): void
  handleClick(): void
}

const PassForm = (props: Props) => {
  const { name, type, value, handleChange, handleClick, state } = props
  const [values, setValues] = useState({
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Wrapper>
      <Img src={values.showPassword ? '/assert/monkey3.png' : '/assert/monkey4.png'} />
      <Content>
        <Title variant="h4">Enter Your Password</Title>
        <Subtitle>Your account is protected with an additional password.</Subtitle>
        <InputWrapper variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <Input
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={handleChange}
            label={`Password`}
            variant="outlined"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </InputWrapper>

        <NextStageButton variant="contained" color="primary" onClick={handleClick}>
          next
        </NextStageButton>
      </Content>
    </Wrapper>
  )
}

export default createAuthForm(AUTH_FORM.PASSWORD, authorizationStateWaitPassword, PassForm)
