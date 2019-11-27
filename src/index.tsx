import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider } from 'emotion-theming'
import App from './App'
import { config } from './constants'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')!,
)
