import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Quotes = ({ match }) => (
  <Suspense fallback={null}>
    <Switch>
{/*       <Redirect exact from={`${match.url}`} to={`${match.url}/list`} /> */}
      {/* <Route path={`${match.url}/list`} component={lazy(() => import('./list'))} /> */}
      <Route path={`${match.url}/motor`} component={lazy(() => import('./motor'))} />
      <Route path={`${match.url}/travel`} component={lazy(() => import('./travel'))} />
      <Route path={`${match.url}/proposal`} component={lazy(() => import('./motor/proposal'))} />
      <Route path={`${match.url}/travel-list`} component={lazy(() => import('../quotes/travel/list'))} />
      <Route exact path={`${match.url}/summary`} component={lazy(() => import('./motor/proposal/StepProvisionalSummary'))} />
    </Switch>
  </Suspense>
)

export default Quotes
