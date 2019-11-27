import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider } from 'emotion-theming'
import App from './App'
import { config } from './constants'

console.log(config)

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')!,
)
