import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

export default function PublicRoutes () {
  return (
    <Switch>
      <Route path='/public/retrieve-quotes' component={lazy(() => import('app/views/quotes/retrieve-quotes'))} />
      <Route path='/public/view-quote' component={lazy(() => import('app/views/quotes/view-quote'))} />
      <Redirect from='/public' to='/public/retrieve-quotes' />
    </Switch>
  )
}
