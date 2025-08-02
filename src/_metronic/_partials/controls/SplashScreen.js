import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { toAbsoluteUrl } from '../../_helpers'
import { logo_dark } from '../../../helpers/assets'

export function SplashScreen () {
  return (
    <>
      <div className='splash-screen'>
        <img
          src={toAbsoluteUrl(logo_dark)}
          alt='swan logo'
        />
        <CircularProgress className='splash-screen-spinner' />
        <h1>sdudssdusd udsghsddsb</h1>
      </div>
    </>
  )
}
