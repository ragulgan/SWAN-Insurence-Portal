import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import objectPath from 'object-path'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../_helpers'
import { useHtmlClassService } from '../../_core/MetronicLayout'

export function HeaderMobile () {
  const uiService = useHtmlClassService()

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, 'aside.self.display'),
      headerMenuSelfDisplay: objectPath.get(uiService.config, 'header.menu.self.display') === true,
      headerMobileCssClasses: uiService.getClasses('header_mobile', true),
      headerMobileAttributes: uiService.getAttributes('header_mobile')
    }
  }, [uiService])

  return (
    <>
      <div
        id='kt_header_mobile'
        className='header-mobile align-items-center'
                // className={`header-mobile align-items-center ${layoutProps.headerMobileCssClasses}`}
        {...layoutProps.headerMobileAttributes}
      >
        <Link to='/' className='mobile-logo'>
          <img alt='logo' src={layoutProps.headerLogo} />
        </Link>
        <div className='d-flex align-items-center'>
          {layoutProps.asideDisplay && (
            <>
              {/* <button className='btn p-0 burger-icon burger-icon-left' id='kt_aside_mobile_toggle'>
                                <span />
                            </button> */}
              <button className='brand-toggle btn btn-sm px-0' id='kt_aside_mobile_toggle'>
                <span className='svg-icon svg-icon-success svg-icon-xl'>
                  <SVG src={toAbsoluteUrl('/icons/Angle-double-left.svg')} />
                </span>
              </button>
            </>
          )}

          {layoutProps.headerMenuSelfDisplay && (
            <>
              {/* <button className='btn p-0 burger-icon ml-4' id='kt_header_mobile_toggle'>
                                <span />
                            </button> */}
              <button className='brand-toggle btn btn-sm px-0' id='kt_header_mobile_toggle'>
                <span className='svg-icon svg-icon-success svg-icon-xl'>
                  <SVG src={toAbsoluteUrl('/icons/Search.svg')} />
                </span>
              </button>
            </>
          )}
          <button
            className='btn btn-hover-text-primary p-0 ml-2'
            id='kt_header_mobile_topbar_toggle'
          >
            <span className='svg-icon svg-icon-success svg-icon-xl'>
              <SVG src={toAbsoluteUrl('/icons/User.svg')} />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
