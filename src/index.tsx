import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import App from './App'
import { config } from './constants'
import * as theme from './theme'

render(
  <ThemeProvider theme={{ ...theme }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')!,
)
