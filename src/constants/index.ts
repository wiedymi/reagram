import * as env from './config'
export * from './auth'
import * as USE_TELEGRAM from './useTelegram'

const config = {
  ...env,
}

export { config, USE_TELEGRAM }
