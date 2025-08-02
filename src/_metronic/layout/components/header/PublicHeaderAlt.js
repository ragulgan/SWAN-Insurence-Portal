import React, { useMemo, useEffect, Fragment } from 'react'
import { useHtmlClassService } from '../../../../_metronic/layout/_core/MetronicLayout'
import { logo_dark } from '../../../../helpers/assets'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  removeSessionStorage
} from '../../../../helpers/helper'
import { MOTOR_FORM, TRAVEL_FORM, VARIABLES } from '../../../../helpers/constants'
import { Grid, Button, AppBar, Toolbar } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import Icofont from 'react-icofont'

const PublicHeaderAlt = () => {
  const uiService = useHtmlClassService()
  const location = useLocation()
  const path = location && location.pathname
  const layoutProps = useMemo(() => {
    return {
      headerContainerClasses: uiService.getClasses('header_container', true)
    }
  }, [uiService])

  const productedPaths = [
    '/customer/quotes/proposal'
  ]
  const getPrevPath = getLocalStorage(MOTOR_FORM.PREV_ROUTE_PATH)
  useEffect(() => {
    const checkDifferPath = path !== getPrevPath
    if (checkDifferPath) {
      if (!productedPaths.includes(path) && !productedPaths.includes(getPrevPath)) {
        removeSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
        removeLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
        removeSessionStorage(VARIABLES.PLAN_ID)
        removeSessionStorage(MOTOR_FORM.ACTIVE_STEP)
      }
    }
    path && setLocalStorage(MOTOR_FORM.PREV_ROUTE_PATH, path)
  }, [path])

  return (
    <>
      <Grid
        className={`header ${layoutProps.headerClasses} header-alt`}
        id='kt_header'
        {...layoutProps.headerAttributes}
      >
        <AppBar position='static' color='transparent'>
          <Toolbar>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='flex-start'
            >
              <Grid item xs={4} sm={4} md={4}>
                <img src={logo_dark} alt='swan_logo' className='max-h-40px px-5' />
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                <ul className='header-alt-ul'>
                  <li>
                    <Button>
                      <Link to='/auth/login'>
                        Back to website
                      </Link>
                    </Button>
                  </li>
                  {/* <li>
                                        <Button>
                                            <Link to="/public/retrieve-quotes">
                                                Retrieve Save Quote
                                            </Link>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button>
                                            <Link to="/auth/login">
                                                <Icofont icon='user-alt-3' />&nbsp;  Login
                                            </Link>
                                        </Button>
                                    </li> */}
                </ul>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  )
}

export default PublicHeaderAlt
