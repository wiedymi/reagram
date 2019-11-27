const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const dotenv = require('dotenv')
const webpackMerge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

const getEnv = env => {
  const currentPath = path.join(__dirname)
  const basePath = currentPath + '/.env'
  const envPath = basePath + '.' + env.ENVIRONMENT
  const finalPath = fs.existsSync(envPath) ? envPath : basePath
  const fileEnv = dotenv.config({ path: finalPath }).parsed
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
    return prev
  }, {})

  return envKeys
}

const sharedConfig = env => {
  const config = {
    entry: `./src/index.tsx`,
    mode: env.ENVIRONMENT ? 'production' : 'development',
    output: {
      filename: `reagram.js`,
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyPlugin([{ from: path.resolve(__dirname, 'views'), to: 'views' }]),
      new webpack.DefinePlugin(getEnv(env)),
    ],
  }

  if (!env.prod) {
    config.devServer = {
      writeToDisk: true,
    }
  }

  return config
}

const sharedConfigServer = env => {
  const config = {
    entry: `./server.ts`,
    mode: env.ENVIRONMENT ? 'production' : 'development',
    output: {
      filename: `server.js`,
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyPlugin([{ from: path.resolve(__dirname, 'views'), to: 'views' }]),
      new webpack.DefinePlugin(getEnv(env)),
    ],
  }

  if (!env.prod) {
    config.devServer = {
      writeToDisk: true,
    }
  }

  return config
}

const sharedClientConfig = {
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          envName: 'client',
        },
      },
    ],
  },
}

const reagram = (env = {}) => webpackMerge(sharedConfig(env), sharedClientConfig)

const serverConfig = env =>
  webpackMerge(sharedConfigServer(env), {
    target: 'node',
    node: {
      __dirname: false,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            envName: 'server',
          },
        },
      ],
    },
    externals: [nodeExternals({ importType: 'commonjs' })],
  })

module.exports = [reagram, serverConfig]
