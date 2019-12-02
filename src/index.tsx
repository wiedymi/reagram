import React, { useState, useEffect } from 'react'
import { initLogger, setupAuth } from '@/helpers'
import { AUTH } from '@/constants'
import { Loading } from '@/components/base'
import { PhoneForm, CodeForm, PassForm } from '@/components/forms'

initLogger()

const stages = {
  [AUTH.PHONE]: <PhoneForm />,
  [AUTH.CODE]: <CodeForm />,
  [AUTH.PASSWORD]: <PassForm />,
  [AUTH.LOADING]: <Loading />,
  [AUTH.SUCCESS]: '<UserInfo />',
}

setupAuth(stages, 'Hello')
