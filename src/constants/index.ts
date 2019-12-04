import * as env from './config'
export * from './auth'
import * as USE_TELEGRAM from './useTelegram'
import * as TYPES from './types'

const config = {
  ...env,
}

export { config, USE_TELEGRAM, TYPES }
