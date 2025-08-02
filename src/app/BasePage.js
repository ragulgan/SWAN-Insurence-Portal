import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'

export default function BasePage () {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from='/' to='/overview' />
        <ContentRoute path='/overview' component={lazy(() => import('../app/views/overview'))} />
        <ContentRoute path='/clients' component={lazy(() => import('../app/views/clients'))} />
        <ContentRoute path='/policies' component={lazy(() => import('../app/views/policies'))} />
        <Route path='/quotes' component={lazy(() => import('../app/views/quotes'))} />
        <Route path='/debtors' component={lazy(() => import('../app/views/debtors'))} />
        <Route path='/instructions' component={lazy(() => import('../app/views/instructions'))} />
        <Route path='/reports' component={lazy(() => import('../app/views/reports'))} />
        <Route path='/documents' component={lazy(() => import('../app/views/documents'))} />
        <Route path='/aml' component={lazy(() => import('../app/views/aml'))} />
        <Route path='*' component={lazy(() => import('../app/views/not-found'))} />
        <Redirect to='not-found' />
      </Switch>
    </Suspense>
  )
}
