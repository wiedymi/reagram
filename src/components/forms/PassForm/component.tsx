import React, { ReactNode, useState } from 'react'
import { IconButton, InputLabel, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import * as B from '@/components/base'
import { authStyles as C } from '@/components/common'
import { AUTH_FORM } from '@/constants'
import { createAuthForm, authorizationStateWaitPassword } from '@/helpers'
import * as S from './styles'

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
    <C.Wrapper>
      <C.Img src={values.showPassword ? '/assert/monkey3.png' : '/assert/monkey4.png'} />
      <C.Content>
        <C.Title variant="h4">Enter Your Password</C.Title>
        <C.Subtitle>Your account is protected with an additional password.</C.Subtitle>
        <S.InputWrapper variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <B.Input
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
        </S.InputWrapper>

        <C.NextStageButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          nextStageButton
        >
          next
        </C.NextStageButton>
      </C.Content>
    </C.Wrapper>
  )
}

export default createAuthForm(AUTH_FORM.PASSWORD, authorizationStateWaitPassword, PassForm)
