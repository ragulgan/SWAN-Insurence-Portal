/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, Switch, Redirect } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { ContentRoute } from '../../../../_metronic/layout'
import Login from './Login'
import Registration from './Registration'
import ForgotPassword from './ForgotPassword'
import '../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss'
import Banner_bleu from '../assets/Banner_bleu.svg'
import background_grey from '../assets/background_grey.svg'
import '../assets/style.css'

export function AuthPage () {
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white' id='kt_login'>
        <div
          className='sfl__login_aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-5 p-lg-10'
          style={{
            backgroundImage: `url(${toAbsoluteUrl(Banner_bleu)})`
          }}
        />
        <div
          className='d-flex flex-column flex-row-fluid bgi-size-cover bgi-no-repeat position-relative p-7 overflow-hidden'
          style={{
            backgroundImage: `url(${toAbsoluteUrl(background_grey)})`
          }}
        >
          <div className='d-flex flex-column-fluid flex-center mt-30 mt-lg-0'>
            <Switch>
              <ContentRoute path='/auth/login' component={Login} />
              <ContentRoute path='/auth/registration' component={Registration} />
              <ContentRoute path='/auth/forgot-password' component={ForgotPassword} />
              <Redirect exact from='/auth' to='/auth/login' />
              <Redirect to='/auth/login' />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
