import React, { Fragment, lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { Layout } from '../_metronic/layout'
import { getSessionStorage } from '../helpers/helper'
import { SESSION } from '../helpers/constants'
import { Toaster } from 'react-hot-toast'

import AuthLayout from './layouts/AuthLayout'
import PublicLayout from './layouts/PublicLayout'
import CustomerLayout from './layouts/CustomerLayout'
import AppLayout from './layouts/AppLayout'

function RouteInterceptor ({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => isAuthenticated
        ? (
            children
          )
        : (
          <Redirect to={{ pathname: '/auth', state: { from: location } }} />
          )}
    />
  )
}

export function Routes (props) {
  const { location } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const authToken = getSessionStorage(SESSION.AUTH_TOKEN)

  return (
    <>
      <Switch>
        {/* Auth page - forec redirect */}
        <Route exact path='/'>
          <Redirect to='/auth/login' />
        </Route>

        {/* Auth Pages */}
        <Route path='/auth'>
          <AuthLayout />
        </Route>

        {/* Public Pages */}
        <Route path='/public'>
          <PublicLayout />
        </Route>

        {/* Customer Pages */}
        <Route path='/customer'>
          <CustomerLayout />
        </Route>

        {/* Protected Pages */}
        <RouteInterceptor path={`/${authRole}`} isAuthenticated={authToken}>
          {/* Metronic Layout */}
          <Layout>
            <AppLayout location={location} />
          </Layout>
        </RouteInterceptor>

        {/* <Route path="*" component={lazy(() => import(`app/views/not-found`))} /> */}
      </Switch>
      <Toaster position='top-center' reverseOrder />
    </>
  )
}
