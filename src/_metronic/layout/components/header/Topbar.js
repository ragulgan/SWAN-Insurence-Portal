import React, { useMemo, useEffect, useState, Fragment } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { toAbsoluteUrl } from '../../../_helpers'
import { useHtmlClassService } from '../../_core/MetronicLayout'
import { SearchDropdown } from '../extras/dropdowns/search/SearchDropdown'
import { UserNotificationsDropdown } from '../extras/dropdowns/UserNotificationsDropdown'
import { QuickActionsDropdown } from '../extras/dropdowns/QuickActionsDropdown'
import { MyCartDropdown } from '../extras/dropdowns/MyCartDropdown'
import { LanguageSelectorDropdown } from '../extras/dropdowns/LanguageSelectorDropdown'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthActions } from '../../../../store/actions/AuthActions'
import { ProfileActions } from '../../../../store/actions/ProfileActions'
import { setLocalStorage, unsetLocalStorage } from '../../../../helpers/local_storage'
import {
  getLocalStorage,
  removeLocalStorage,
  removeSessionStorage,
  getSessionStorage
} from '../../../../helpers/helper'
import { MOTOR_FORM, TRAVEL_FORM, VARIABLES } from '../../../../helpers/constants'
import SVG from 'react-inlinesvg'
import objectPath from 'object-path'
import QuickUserToggler from '../extras/QuiclUserToggler'
import LogoutConfirmation from '../../../../app/widgets/LogoutConfirmation'

function Topbar (props) {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const history = useHistory()
  const location = useLocation()
  const path = location && location.pathname
  const { logoutDispatch, myProfileDispatch, LogoutStatus, profileLoading, profileData } = props
  const [popConfirm, setPopConfirm] = useState(false)
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      viewSearchDisplay: objectPath.get(
        uiService.config,
        'extras.search.display'
      ),
      viewNotificationsDisplay: objectPath.get(
        uiService.config,
        'extras.notifications.display'
      ),
      viewQuickActionsDisplay: objectPath.get(
        uiService.config,
        'extras.quick-actions.display'
      ),
      viewCartDisplay: objectPath.get(uiService.config, 'extras.cart.display'),
      viewQuickPanelDisplay: objectPath.get(
        uiService.config,
        'extras.quick-panel.display'
      ),
      viewLanguagesDisplay: objectPath.get(
        uiService.config,
        'extras.languages.display'
      ),
      viewUserDisplay: objectPath.get(uiService.config, 'extras.user.display')
    }
  }, [uiService])

  const LogoutHandler = () => {
    setPopConfirm(true)
    unsetLocalStorage()
    logoutDispatch()
  }
  const handleClose = () => {
    setPopConfirm(false)
  }

  useEffect(() => {
    if (LogoutStatus === undefined || LogoutStatus === 'undefined') {
      // history.push(`/auth/login`)
      window.location.replace('/auth/overview')
    }
  })

  useEffect(() => {
    window.onbeforeunload = () => {
      // localStorage.clear();
    }
  }, [window])

  useEffect(() => {
    myProfileDispatch()
  }, [])

  useEffect(() => {
    if (profileData) {
      setLocalStorage('logged_user', profileData?.LOGIN)
      setLocalStorage('logged_agency', profileData?.AGENCY)
      setLocalStorage('logged_company', profileData?.COMPANY)
    }
  }, [profileData])
  const protectedPaths = [
        `/${authRole}/quotes/proposal`,
        `/${authRole}/overview`,
        `/${authRole}/quotes/summary`,
        `/${authRole}/quotes/list`,        
  ]
  const getPrevPath = getLocalStorage(MOTOR_FORM.PREV_ROUTE_PATH)
  useEffect(() => {
    const checkDifferPath = path !== getPrevPath
    if (checkDifferPath) {
      if (!protectedPaths.includes(path) && !protectedPaths.includes(getPrevPath)) {
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
      <div className='topbar'>
        {layoutProps.viewSearchDisplay && <SearchDropdown />}
        {layoutProps.viewNotificationsDisplay && <UserNotificationsDropdown />}
        {layoutProps.viewQuickActionsDisplay && <QuickActionsDropdown />}
        {layoutProps.viewCartDisplay && <MyCartDropdown />}
        {layoutProps.viewQuickPanelDisplay && (
          <OverlayTrigger placement='bottom' overlay={<Tooltip id='quick-panel-tooltip'>Quick panel</Tooltip>}>
            <div
              className='topbar-item'
              data-toggle='tooltip'
              title='Quick panel'
              data-placement='right'
            >
              <div className='btn btn-icon btn-clean btn-lg mr-1' id='kt_quick_panel_toggle'>
                <span className='svg-icon svg-icon-xl svg-icon-primary'>
                  <SVG src={toAbsoluteUrl('/icons/Layout-4-blocks.svg')} />
                </span>
              </div>
            </div>
          </OverlayTrigger>)}
        {layoutProps.viewLanguagesDisplay && <LanguageSelectorDropdown />}
        {layoutProps.viewUserDisplay && <QuickUserToggler loading={profileLoading} user={profileData} />}
        <div className='user-logout d-flex align-items-center btn-lg px-2'>
          <div
            className='btn btn-icon btn-clean btn-lg btn-text-primary btn-hover-light-primary'
            onClick={() => {
              setPopConfirm(true)
            }}
          >
            <span className='svg-icon svg-icon-xl svg-icon-primary'>
              <SVG src={toAbsoluteUrl('/icons/Upload.svg')} />
            </span>
          </div>
        </div>
      </div>
      <LogoutConfirmation open={popConfirm} close={handleClose} logout={LogoutHandler} />
    </>
  )
}

const mapStateToProps = (state) => {
  const { Auth, Profile } = state
  return {
    LogoutStatus: Auth.logout,
    profileLoading: Profile.profileLoading,
    profileData: Profile.profileData
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutDispatch: () => dispatch(AuthActions.SignOut()),
  myProfileDispatch: () => dispatch(ProfileActions.MyProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
