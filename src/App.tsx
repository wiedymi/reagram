import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'routes'

export default function App(): ReactNode {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  )
}
