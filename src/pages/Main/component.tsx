import React from 'react'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Auth from 'components/forms/auth/component'
import * as S from './styles'

type Props = {
  children: ReactNode
}

import { telegram } from 'helpers'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'

function Main(props: Props) {
  let context = <div>Laoding</div>

  telegram.on(UPDATE.updateAuthorizationState, async ({ update }, next) => {
    const { authorizationState } = update

    switch (authorizationState._) {
      case AUTHORIZATION_STATE.authorizationStateWaitPhoneNumber: {
        await telegram.api.setAuthenticationPhoneNumber({
          phoneNumber: '1234567890',
        })
        console.log('asdf')
        context = <div>Phone</div>
        break
      }
      case AUTHORIZATION_STATE.authorizationStateWaitCode: {
        await telegram.api.checkAuthenticationCode({
          code: '1234',
        })
        context = <div>code</div>
        break
      }
      case AUTHORIZATION_STATE.authorizationStateReady: {
        console.log('Success authorization!')
        context = <div>Success authorization!</div>
        return next()
      }
      default: {
        return next()
      }
    }
  })

  return (
    <Layout>
      <Header />
      <S.Main>{context}</S.Main>
    </Layout>
  )
}

export default Main
