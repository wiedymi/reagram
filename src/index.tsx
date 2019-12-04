import React from 'react'
import { initLogger, setupAuth } from '@/helpers'
import { AUTH } from '@/constants'
import { Loading } from '@/components/base'
import { PhoneForm, CodeForm, PassForm } from '@/components/forms'
import App from './App'

initLogger()

const stages = {
  [AUTH.PHONE]: <PhoneForm />,
  [AUTH.CODE]: <CodeForm />,
  [AUTH.PASSWORD]: <PassForm />,
  [AUTH.LOADING]: <Loading />,
  [AUTH.SUCCESS]: <App />,
}

setupAuth(stages, <Loading />)
