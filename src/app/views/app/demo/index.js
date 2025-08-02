import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import Loading from 'components/shared-components/Loading';

const Demo = ({ match }) => (
  // <Suspense fallback={<Loading cover="content" />}>
  <Suspense>
    <Switch>
      <Redirect exact from='app' to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={lazy(() => import('./list'))} />
      <Route path={`${match.url}/create`} component={lazy(() => import('./create'))} />
      <Route path={`${match.url}/view/:id`} component={lazy(() => import('./view'))} />
      <Route path={`${match.url}/edit/:id`} component={lazy(() => import('./edit'))} />
    </Switch>
  </Suspense>
)

export default Demo
