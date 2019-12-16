const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const dotenv = require('dotenv')
const webpackMerge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const WorkerPlugin = require('worker-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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

  return {
    'process.env': envKeys,
    ...envKeys,
  }
}

const sharedConfig = env => {
  const config = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    mode: env.ENVIRONMENT ? 'production' : 'development',
    devtool: 'source-map',
    output: {
      filename: `reagram.js`,
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    externals: {
      tdweb: 'tdweb',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          tslfint: {
            emitErrors: true,
            failOnHint: true,
          },
        },
      }),
      new webpack.DefinePlugin(getEnv(env)),
      new WorkerPlugin(),
      new CopyPlugin([{ from: path.resolve(__dirname, 'views'), to: '.' }]),
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'node_modules/tdweb/dist/**/*'),
          to: '.',
          flatten: true,
          copyUnmodified: true,
          ignore: ['tdweb.js'],
        },
      ]),
    ],
  }

  if (!env.prod) {
    config.devServer = {
      contentBase: path.join(__dirname, 'public/'),
      compress: true,
      port: 8000,
      hot: true,
      writeToDisk: true,
      historyApiFallback: true,
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

module.exports = [reagram]
