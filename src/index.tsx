import React, { useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import App from './App'
import { config } from './constants'
import * as theme from './theme'
import { telegram } from 'helpers'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'

const {
  authorizationStateWaitPhoneNumber,
  authorizationStateWaitCode,
  authorizationStateWaitPassword,
  authorizationStateReady,
  authorizationStateClosed,
} = AUTHORIZATION_STATE

const { updateAuthorizationState } = UPDATE

const createForm = (NAME, EVENT) => {
  return () => {
    const [value, setValue] = useState('')

    const handleChange = ({ target }) => {
      setValue(target.value)
    }

    const handleClick = () => {
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
      <>
        <input
          name={NAME}
          type={TYPES[NAME]}
          value={value}
          onChange={handleChange}
          placeholder={`Enter your ${NAME}`}
        />
        <button onClick={handleClick}>next</button>
      </>
    )
  }
}

const PhoneForm = createForm('phone', authorizationStateWaitPhoneNumber)

const CodeForm = createForm('code', authorizationStateWaitCode)

const PassForm = createForm('password', authorizationStateWaitPassword)

const UserInfo = () => {
  const [value, setValue] = useState('')

  const getUserInfo = async () => {
    const user = await telegram.api.getMe()
    const chats = await telegram.getListOfChats()

    console.log(chats)
  }

  const search = async () => {
    const chats = await telegram.api.searchChatsOnServer({ query: value, limit: 10 })
    const chat = await telegram.api.getMessages({ chatId: chats.response.chatIds[0] })
  }

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <button onClick={search}>search</button>
      <button onClick={getUserInfo}>GetUserInfo</button>
    </div>
  )
}

const nextStage = stage => {
  const stages = {
    PHONE: <PhoneForm />,
    CODE: <CodeForm />,
    PASSWORD: <PassForm />,
    LOADING: 'LOADING',
    SUCCESS: <UserInfo />,
  }

  const logout = () => {
    telegram.emit({
      _: updateAuthorizationState,
      authorizationState: {
        _: authorizationStateClosed,
      },
    })
  }

  render(
    <ThemeProvider theme={{ ...theme }}>
      <BrowserRouter>
        <div>
          <button onClick={logout}>log out</button>
          {stages[stage]}
        </div>
      </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')!,
  )
}

telegram.on(updateAuthorizationState, async ({ update, setState, getState }, next) => {
  const { authorizationState } = update

  const state = update
  console.log(state)
  switch (authorizationState._) {
    case authorizationStateWaitPhoneNumber: {
      await telegram.api.setAuthenticationPhoneNumber({
        phoneNumber: state.phone || '',
      })
      nextStage('PHONE')
      return next()
    }
    case authorizationStateWaitCode: {
      await telegram.api.checkAuthenticationCode({
        code: state.code || '',
      })
      nextStage('CODE')
      break
    }

    case authorizationStateWaitPassword: {
      await telegram.api.checkAuthenticationPassword({
        password: state.password || '',
      })
      nextStage('PASSWORD')
      break
    }
    case authorizationStateReady: {
      console.log('Success authorization!')
      nextStage('SUCCESS')
      break
    }
    case authorizationStateClosed: {
      await telegram.api.logOut()

      nextStage('PHONE')
      break
    }
    default: {
      nextStage('LOADING')
      return next()
    }
  }
})
