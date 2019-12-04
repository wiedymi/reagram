import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { createMuiTheme } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import * as themeDefault from '@/theme'
import { AUTH } from '@/constants'
import { telegram } from '@/helpers'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'

const theme = createMuiTheme(themeDefault)

export const {
  authorizationStateWaitPhoneNumber,
  authorizationStateWaitCode,
  authorizationStateWaitPassword,
  authorizationStateReady,
  authorizationStateClosed,
} = AUTHORIZATION_STATE

const { updateAuthorizationState } = UPDATE

let state = {}

export const createAuthForm = (NAME, EVENT, Component) => {
  return function AuthComponent(): ReactNode {
    const [value, setValue] = useState('')

    const handleChange = ({ target }): void => {
      setValue(target.value)
    }

    const handleClick = (): void => {
      state = {
        ...state,
        [NAME]: value,
      }

      telegram.emit({
        _: updateAuthorizationState,
        authorizationState: {
          _: EVENT,
        },
        [NAME]: value,
      })
    }

    const TYPES = {
      phone: 'number',
      code: 'password',
      password: 'password',
    }

    return (
      <Component
        name={NAME}
        type={TYPES[NAME]}
        value={value}
        handleChange={handleChange}
        handleClick={handleClick}
        state={state}/>
    )
  }
}

export const setupAuth = function(stages: object, defaultLoading: Any): void {
  if (!stages) {
    throw new Error('Stages are required')
  }

  const renderRoot = (nextStage): void => {
    const Root = (): ReactNode => {
      const [stage, setStage] = useState(defaultLoading)

      useEffect(() => {
        setStage(nextStage)
      }, [])

      return (
        <ThemeProvider theme={theme}>
          <BrowserRouter>{stage}</BrowserRouter>
        </ThemeProvider>
      )
    }

    render(<Root />, document.getElementById('root'))
  }

  const nextStage = (stage): void => {
    renderRoot(stages[stage])
  }

  telegram.on(updateAuthorizationState, async ({ update }, next): any => {
    const { authorizationState } = update
    const user = update

    switch (authorizationState._) {
      case authorizationStateWaitPhoneNumber: {
        await telegram.api.setAuthenticationPhoneNumber({
          phoneNumber: user.phone || '',
        })
        nextStage(AUTH.PHONE)
        return next()
      }
      case authorizationStateWaitCode: {
        await telegram.api.checkAuthenticationCode({
          code: user.code || '',
        })
        nextStage(AUTH.CODE)
        break
      }

      case authorizationStateWaitPassword: {
        await telegram.api.checkAuthenticationPassword({
          password: user.password || '',
        })
        nextStage(AUTH.PASSWORD)
        break
      }
      case authorizationStateReady: {
        state = {}
        nextStage(AUTH.SUCCESS)
        break
      }
      case authorizationStateClosed: {
        await telegram.api.logOut()
        state = {}
        nextStage(AUTH.PHONE)
        break
      }
      default: {
        nextStage(AUTH.PHONE)
        return next()
      }
    }
  })
}
