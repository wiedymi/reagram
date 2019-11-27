import React from 'react'
import Koa from 'koa'
import views from 'koa-views'
import logger from 'koa-logger'
import url from 'url'
import path from 'path'
import fetch from 'node-fetch'
import { Client } from 'tdl'
import { TDLib } from 'tdl-tdlib-ffi'

const client = new Client(new TDLib('./libtdjson'), {
  apiId: process.env.APP_ID,
  apiHash: process.env.API_HASH,
})

const app = new Koa()

app.use(
  views(path.resolve(__dirname, 'views'), {
    map: {
      html: 'twig',
    },
  }),
)

app.use(logger())

if (!process.env.prod) {
  /**
   * A proxy for assets on devServer is needed only during development.
   * devServer listens to http://localhost:8080 and gives everything in the root directory.
   * At production, Nginx will do this, not the front-end server.
   * The build/ directory contains the assets we need.
   * http://localhost:3000/assets/some.js -> http://localhost:8080/build/some.js
   */
  app.use(async (ctx, next) => {
    if (!ctx.path.startsWith('/assets')) {
      await next()
      return
    }
    const path = ctx.path.replace(/^\/assets/i, '/build')
    const assetUrl = new url.URL(path, process.env.HOST || 'http://localhost:8080')
    const result = await fetch(assetUrl)
    ctx.status = result.status
    result.headers.forEach((value, name) => ctx.set(name, value))
    ctx.body = result.body
  })
}

app.use(async ctx => {
  await ctx.render('index.html')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Frontend app is now running on http://localhost:${PORT}`))
process.setMaxListeners(0)
