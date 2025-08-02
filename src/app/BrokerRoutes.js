import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'

export default function BrokerRoutes (props) {
  const { broker } = props

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={`/${broker}/overview`} component={lazy(() => import('../app/views/overview'))} />
        <ContentRoute path={`/${broker}/clients`} component={lazy(() => import('../app/views/clients'))} />
        <ContentRoute path={`/${broker}/policies`} component={lazy(() => import('../app/views/policies'))} />
        <Route path={`/${broker}/quotes`} component={lazy(() => import('../app/views/quotes-broker'))} />
        <Route path={`/${broker}/debtors`} component={lazy(() => import('../app/views/debtors'))} />
        <Route path={`/${broker}/instructions`} component={lazy(() => import('../app/views/instructions'))} />
        <Route path={`/${broker}/reports`} component={lazy(() => import('../app/views/reports'))} />
        <Route path={`/${broker}/documents`} component={lazy(() => import('../app/views/documents'))} />
        <Route path={`/${broker}/aml`} component={lazy(() => import('../app/views/aml'))} />
        <Redirect from={`/${broker}`} to={`/${broker}/overview`} />
      </Switch>
    </Suspense>
  )
}
