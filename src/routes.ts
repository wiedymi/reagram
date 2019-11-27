import { RouteProps } from 'react-router-dom'
import { Main, NotFound } from 'pages'

const routes: Array<RouteProps> = [
  {
    path: '/',
    component: Main,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
