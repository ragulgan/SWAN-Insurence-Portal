import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'

export default function AgentRoutes (props) {
  const { agent } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )

  const individualRoutes = (val) => {
    return [
      'motor'
    ].includes(val)
  }

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={`/${agent}/overview`} component={lazy(() => import('../app/views/overview'))} />
        <ContentRoute path={`/${agent}/clients`} component={lazy(() => import('../app/views/clients'))} />
        <ContentRoute path={`/${agent}/policies`} component={lazy(() => import('../app/views/policies'))} />
        <Route
          path={`/${agent}/quotes`}
          component={lazy(() =>
            individualRoutes('motor')
              ? import(`../app/views/quotes-${authRole}`)
              : import('../app/views/quotes')
          )}
        />
        <Route path={`/${agent}/quotes/travel-list`} component={lazy(() => import('../app/views/quotes/travel'))} />
        <Route path={`/${agent}/debtors`} component={lazy(() => import('../app/views/debtors'))} />
        <Route path={`/${agent}/instructions`} component={lazy(() => import('../app/views/instructions'))} />
        <Route path={`/${agent}/reports`} component={lazy(() => import('../app/views/reports'))} />
        <Route path={`/${agent}/documents`} component={lazy(() => import('../app/views/documents'))} />
        <Route path={`/${agent}/aml`} component={lazy(() => import('../app/views/aml'))} />
        <Redirect from={`/${agent}`} to={`/${agent}/overview`} />
      </Switch>
    </Suspense>
  )
}
