import { telegram } from './telegram'

export const initLogger = (): void =>
  telegram.use(async (ctx, next) => {
    if ('update' in ctx) {
      console.log(`[all updates][${ctx._}]`, ctx.update)
    }

    return next()
  })
