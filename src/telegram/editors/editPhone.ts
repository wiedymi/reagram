import { emit } from '../core'
import { UPDATE, AUTHORIZATION_STATE } from '@airgram/constants'
const { authorizationStateWaitPhoneNumber } = AUTHORIZATION_STATE

const { updateAuthorizationState } = UPDATE

export const editPhone = async function(): void {
  emit({
    _: updateAuthorizationState,
    authorizationState: {
      _: authorizationStateWaitPhoneNumber,
    },
  })
}
