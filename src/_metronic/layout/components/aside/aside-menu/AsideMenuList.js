import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers'
import { removeLocalStorage, removeSessionStorage } from '../../../../../helpers/helper'
import { MOTOR_FORM, TRAVEL_FORM, VARIABLES } from '../../../../../helpers/constants'
import _ from 'lodash'
import SVG from 'react-inlinesvg'
import Icofont from 'react-icofont'

export function AsideMenuList (props) {
  const location = useLocation()
  const [myRoutes, setMyRoutes] = useState(null)
  const { layoutProps, loading, menus } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url) ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open menu-item-not-hightlighted` : ''
  }
  const getActiveSvg = (url, hasSubmenu = false) => {
    return checkIsActive(location, url) ?  `${hasSubmenu && 'menu-item-active'} svg-icon-light` : ''
  }

  return (
    <>
      {loading
        ? 'Loading ...'
        : _.isEmpty(menus)
          ? null
          : (
            <ul className={`menu-nav ${layoutProps.ulClasses}`}>
              {menus.map((nRoute) => (
                <li
                  key={`a_${nRoute.key}`}
                  className={`menu-item ${!_.isEmpty(nRoute?.submenu) ? 'menu-item-submenu' : ''} ${getMenuItemActive(`/${nRoute.slug}`, false)}`}
                  aria-haspopup='true'
                  data-menu-toggle={`${_.has(nRoute, 'submenu') ? 'hover' : 'none'}`}
                >
                  <NavLink className={`menu-link ${!_.isEmpty(nRoute?.submenu) ? 'menu-toggle' : ''}`} to={`/${authRole}/${nRoute.slug}`}>
                    <span className={`svg-icon mr-1 ${getActiveSvg(`/${nRoute.slug}`, false)}`}>
                      <SVG src={toAbsoluteUrl(nRoute.icon)} />
                    </span>
                    <span className='menu-text'>{nRoute.menu}</span>
                    {!_.isEmpty(nRoute?.submenu) ? (<Icofont className='menu-arrow' icon='thin-right' />) : null}
                  </NavLink>
                  {!_.isEmpty(nRoute?.submenu)
                    ? (
                      <div className='menu-submenu'>
                        <ul className='menu-subnav'>
                          {nRoute.submenu && nRoute.submenu.map((nMenu) => (
                            <li
                              onClick={() => {
                                removeSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
                                removeLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
                                removeSessionStorage(MOTOR_FORM.ACTIVE_STEP)
                                removeSessionStorage(VARIABLES.PLAN_ID)
                              }}
                              key={`a_${nMenu.key}`}
                              className={`menu-item ${getMenuItemActive(`/${nMenu.slug}`, false)}`}
                              aria-haspopup='true'
                              data-menu-toggle='hover'
                            >
                              <NavLink className='menu-link' to={`/${authRole}/${nMenu.slug}`}>
                                <span className={`svg-icon mr-1 ${getActiveSvg(`/${nRoute.route}`, false)}`}>
                                  <SVG src={toAbsoluteUrl(nMenu.icon)} />
                                </span>
                                <span className='menu-text'>{nMenu.menu}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>)
                    : null}
                </li>
              ))}
            </ul>
            )}
    </>
  )
}
