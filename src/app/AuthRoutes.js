/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, Switch, Redirect } from 'react-router-dom'
import { toAbsoluteUrl } from '../_metronic/_helpers'
import { ContentRoute } from '../_metronic/layout'
import Login from '../app/views/auth/login'
import ForgotPassword from '../app/views/auth/forgot-password'
import ResetPassword from '../app/views/auth/reset-password'
import '_metronic/_assets/sass/pages/login/classic/login-1.scss'
import './views/auth/style.css'
import { auth_sidebar, auth_bg, logo_light } from '../helpers/assets'

export default function AuthRoutes () {
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white' id='kt_login'>
        <div
          className='sfl__login_aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-5 p-lg-10'
          style={{
            backgroundImage: `url(${toAbsoluteUrl(auth_sidebar)})`
          }}
        >
          <div>
            <img src={`${toAbsoluteUrl(logo_light)}`} style={{ maxWidth: '90%' }} />
          </div>
        </div>
        <div
          className='d-flex flex-column flex-row-fluid bgi-size-cover bgi-no-repeat position-relative p-7 overflow-hidden'
          style={{
            backgroundImage: `url(${toAbsoluteUrl(auth_bg)})`
          }}
        >
          <div className='d-flex flex-column-fluid flex-center mt-30 mt-lg-0'>
            <Switch>
              <ContentRoute path='/auth/login' component={Login} />
              <ContentRoute path='/auth/forgot-password' component={ForgotPassword} />
              <ContentRoute path='/auth/reset-password' component={ResetPassword} />
              {/* <Redirect exact={true} from="/auth" to="/auth/login" />
                            <Redirect to="/auth/login" /> */}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
