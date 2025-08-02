/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router'
import { checkIsActive } from '../../../../_helpers'
import Select from 'react-select'

export function HeaderMenu ({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? 'menu-item-active' : ''
  }
  const changeHandler = () => {

  }
  const options = [
    { value: 'swan_general', label: 'SWAN GENERAL', disabled: true },
    { value: 'swan_lite', label: 'SWAN LIGHT', disabled: true },
    { value: 'swan_gold', label: 'SWAN GOLD', disabled: true }
  ]
  return (
    <div
      id='kt_header_menu'
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >

      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`} style={{ width: '200px', paddingLeft: '15px' }}>
          <Select
            className='w-100'
            options={options}
            isDisabled
            onChange={changeHandler}
            isOptionDisabled={(option) => option.disabled}
            defaultValue={{ label: 'SWAN GENERAL', value: 'swan_general' }}
          />
        </li>
      </ul>
    </div>
  )
}
