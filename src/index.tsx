import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import App from './App'
import { config } from './constants'
import * as theme from './theme'

import { Airgram, Auth } from '@airgram/web'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'

const airgram = new Airgram({
  apiId: config.APP_ID,
  apiHash: config.API_HASH,
})

airgram.on(UPDATE.updateAuthorizationState, async ({ update }, next) => {
  await airgram.api.logOut()

  const { authorizationState } = update
  console.log(authorizationState._, AUTHORIZATION_STATE)
  switch (authorizationState._) {
    case AUTHORIZATION_STATE.authorizationStateWaitPhoneNumber: {
      await airgram.api.setAuthenticationPhoneNumber({
        phoneNumber: '',
      })

      break
    }
    case AUTHORIZATION_STATE.authorizationStateWaitCode: {
      await airgram.api.checkAuthenticationCode({
        code: '',
      })
      break
    }

    case AUTHORIZATION_STATE.authorizationStateWaitPassword: {
      await airgram.api.checkAuthenticationPassword({
        password: '',
      })
      break
    }

    case AUTHORIZATION_STATE.authorizationStateReady: {
      console.log('Success authorization!')
      const me = await airgram.api.getMe()
      console.log(me)
      return next()
    }
    default: {
      return next()
    }
  }
})

render(
  <ThemeProvider theme={{ ...theme }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')!,
)
