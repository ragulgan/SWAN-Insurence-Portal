/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import objectPath from 'object-path'
import { useHtmlClassService } from '../../../_core/MetronicLayout'
import { toAbsoluteUrl } from '../../../../_helpers'
import { unsetLocalStorage } from '../../../../../helpers/helper'
import { DropdownTopbarItemToggler } from '../../../../_partials/dropdowns'
import PersonIcon from '@material-ui/icons/Person'
import LogoutConfirmation from '../../../../../app/widgets/LogoutConfirmation'
import { AuthActions } from '../../../../../store/actions'

function UserProfileDropdown (props) {
  const { logoutDispatch, user, LogoutStatus } = props
  const [popConfirm, setPopConfirm] = useState(false)
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      light: objectPath.get(uiService.config, 'extras.user.dropdown.style') === 'light'
    }
  }, [uiService])

  const handleLogout = () => {
    unsetLocalStorage()
    window.location = '/'
  }

  const LogoutHandler = () => {
    setPopConfirm(true)
    logoutDispatch()
  }
  const handleClose = () => {
    setPopConfirm(false)
  }

  return (
    <>
      <Dropdown drop='down' alignRight>
        <Dropdown.Toggle
          as={DropdownTopbarItemToggler}
          id='dropdown-toggle-user-profile'
        >
          <div className='btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2'>
            <span className='symbol symbol-35 symbol-light-success'>
              <span className='symbol-label font-size-h5 font-weight-bold'>
                <PersonIcon />
              </span>
            </span>
            <span className='text-dark-50 font-weight-bolder font-size-base d-none d-md-inline ml-3 looged-user'>
              <p>{user && user.FIRSTNAME}</p>
              <p className='occupation'>{user && user.USERTYPE}</p>
            </span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className='p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl'>
          <>
            {layoutProps.light && (
              <>
                <div className='d-flex align-items-center p-8 rounded-top'>
                  <div className='symbol symbol-md bg-light-primary mr-3 flex-shrink-0'>
                    <img src={toAbsoluteUrl('/media/users/300_21.jpg')} alt='' />
                  </div>
                  <div className='text-dark m-0 flex-grow-1 mr-3 font-size-h5'>
                    {user && user.FIRSTNAME}
                  </div>
                  <span className='label label-light-success label-lg font-weight-bold label-inline'>
                    3 messages
                  </span>
                </div>
                <div className='separator separator-solid' />
              </>
            )}
            {!layoutProps.light && (
              <div
                className='d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top'
              >
                <div className='symbol bg-white-o-15 mr-3'>
                  <div className='btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2'>
                    <span className='text-muted font-weight-bold font-size-base d-none d-md-inline mr-1' />
                    <span className='symbol symbol-35 symbol-light-success'>
                      <span className='symbol-label font-size-h5 font-weight-bold'>
                        <PersonIcon />
                      </span>
                    </span>
                    <span className='text-dark-50 font-weight-bolder font-size-base d-none d-md-inline ml-3 looged-user'>
                      <p>{user && user.FIRSTNAME}</p>
                      <p className='occupation'>{user && user.USERTYPE}</p>
                    </span>
                  </div>
                  {/* <img alt="Pic" className="hidden" src={user &&  user.pic} /> */}
                </div>
                <div className='text-white m-0 flex-grow-1 mr-3 font-size-h5'>
                  {user && user.FIRSTNAME}
                </div>
                <span className='label label-success label-lg font-weight-bold label-inline'>
                  4 messages
                </span>
              </div>
            )}
          </>
          <div className='navi navi-spacer-x-0'>
            <Link to='/user-profile' className='navi-item px-8 cursor-pointer'>
              <div className='navi-link'>
                <div className='navi-icon mr-2'>
                  <i className='flaticon2-calendar-3 text-success' />
                </div>
                <div className='navi-text'>
                  <div className='font-weight-bold cursor-pointer'>
                    My Profile
                  </div>
                  <div className='text-muted'>
                    Account settings and more
                    <span className='label label-light-danger label-inline font-weight-bold'>
                      update
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            {/* <a className='navi-item px-8'>
                        <div className='navi-link'>
                          <div className='navi-icon mr-2'>
                            <i className='flaticon2-mail text-warning' />
                          </div>
                          <div className='navi-text'>
                            <div className='font-weight-bold'>My Messages</div>
                            <div className='text-muted'>Inbox and tasks</div>
                          </div>
                        </div>
                    </a>
                    <a className='navi-item px-8'>
                        <div className='navi-link'>
                          <div className='navi-icon mr-2'>
                            <i className='flaticon2-rocket-1 text-danger' />
                          </div>
                          <div className='navi-text'>
                            <div className='font-weight-bold'>My Activities</div>
                            <div className='text-muted'>Logs and notifications</div>
                          </div>
                        </div>
                    </a>
                    <a className='navi-item px-8'>
                        <div className='navi-link'>
                          <div className='navi-icon mr-2'>
                            <i className='flaticon2-hourglass text-primary' />
                          </div>
                          <div className='navi-text'>
                            <div className='font-weight-bold'>My Tasks</div>
                            <div className='text-muted'>latest tasks and projects</div>
                          </div>
                        </div>
                    </a> */}
            <div className='navi-separator mt-3' />
            <div className='navi-footer  px-8 py-5'>
              <button
                className='btn btn-light-danger font-weight-bold'
                onClick={() => {
                  setPopConfirm(true)
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
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
  logoutDispatch: () => dispatch(AuthActions.SignOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDropdown)
