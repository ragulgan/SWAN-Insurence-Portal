import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'

export default function CustomerRoutes (props) {
  const { customer } = props

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={`/${customer}/overview`} component={lazy(() => import('../app/views/overview'))} />
        <ContentRoute path={`/${customer}/clients`} component={lazy(() => import('../app/views/clients'))} />
        <ContentRoute path={`/${customer}/policies`} component={lazy(() => import('../app/views/policies'))} />
        <Route path={`/${customer}/quotes`} component={lazy(() => import('../app/views/quotes-customer'))} />
        <Route path={`/${customer}/debtors`} component={lazy(() => import('../app/views/debtors'))} />
        <Route path={`/${customer}/instructions`} component={lazy(() => import('../app/views/instructions'))} />
        <Route path={`/${customer}/reports`} component={lazy(() => import('../app/views/reports'))} />
        <Route path={`/${customer}/documents`} component={lazy(() => import('../app/views/documents'))} />
        <Route path={`/${customer}/aml`} component={lazy(() => import('../app/views/aml'))} />
        <Redirect from={`/${customer}`} to={`/${customer}/overview`} />
      </Switch>
    </Suspense>
  )
}
