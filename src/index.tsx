import React from 'react'
import { initLogger, setupAuth } from '@/helpers'
import { AUTH } from '@/constants'
import { BigLoading } from '@/components/common'
import { PhoneForm, CodeForm, PassForm } from '@/components/forms'
import App from './App'

initLogger()

const stages = {
  [AUTH.PHONE]: <PhoneForm />,
  [AUTH.CODE]: <CodeForm />,
  [AUTH.PASSWORD]: <PassForm />,
  [AUTH.LOADING]: <BigLoading />,
  [AUTH.SUCCESS]: <App />,
}

setupAuth(stages, <BigLoading />)
