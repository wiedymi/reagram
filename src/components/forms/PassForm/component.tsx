import React, { ReactNode, useState } from 'react'
import { IconButton, InputLabel, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Input } from '@/components/base'
import { authStyles } from '@/components/common'
import { AUTH_FORM } from '@/constants'
import { createAuthForm, authorizationStateWaitPassword } from '@/helpers'
import { InputWrapper } from './styles'

const { Wrapper, Img, Title, Subtitle, NextStageButton, Content } = authStyles

type Props = {
  children: ReactNode;
  state: Any;
  name: string;
  type: string;
  value: string;
  handleChange(): void;
  handleClick(): void;
}

const PassForm = (props: Props): ReactNode => {
  const { name, value, handleChange, handleClick } = props
  const [values, setValues] = useState({
    showPassword: false,
  })

  const handleClickShowPassword = (): void => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
            inputType="outlined"
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
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}/>
        </InputWrapper>

        <NextStageButton variant="contained" color="primary" onClick={handleClick} nextStageButton>
          next
        </NextStageButton>
      </Content>
    </Wrapper>
  )
}

export default createAuthForm(AUTH_FORM.PASSWORD, authorizationStateWaitPassword, PassForm)
