import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Quotes = ({ match }) => (
  <Suspense fallback={null}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={lazy(() => import('./list'))} />
      <Route path={`${match.url}/health`} component={lazy(() => import('./health'))} />
      <Route path={`${match.url}/home`} component={lazy(() => import('./home'))} />
      <Route path={`${match.url}/motor`} component={lazy(() => import('./motor'))} />
      <Route path={`${match.url}/travel`} component={lazy(() => import('./travel'))} />
      <Route path={`${match.url}/marine`} component={lazy(() => import('./marine'))} />
      <Route path={`${match.url}/proposal`} component={lazy(() => import('./motor/proposal'))} />
    </Switch>
  </Suspense>
)

export default Quotes
