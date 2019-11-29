import { telegram } from './telegram'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'

class Auth {
  constructor(client) {
    this.telegram = client

    this.setPhone = async phoneNumber => {
      const result = telegram.api
        .setAuthenticationPhoneNumber({
          phoneNumber,
        })
        .then(data => console.log('sadf', data))
      console.log('asdfasdf', result)
      return result
    }

    this.setCode = async code => {
      const result = await this.telegram.api.checkAuthenticationCode({
        code,
      })

      return result
    }

    this.setPassword = async password => {
      const result = await this.telegram.api.checkAuthenticationPassword({
        password,
      })

      return result
    }
  }
}

export const auth = new Auth(telegram)
