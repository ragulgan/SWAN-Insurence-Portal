import React, { useMemo, Fragment } from 'react'
import objectPath from 'object-path'
// LayoutContext
import { useHtmlClassService } from '../_core/MetronicLayout'
// Import Layout components
import { Header } from './header/Header'
import { HeaderMobile } from './header-mobile/HeaderMobile'
import { Aside } from './aside/Aside'
// import {Footer} from "./footer/Footer";
import { LayoutInit } from './LayoutInit'
import { SubHeader } from './subheader/SubHeader'
import { QuickPanel } from './extras/offcanvas/QuickPanel'
import { QuickUser } from './extras/offcanvas/QuickUser'
import { ScrollTop } from './extras/ScrollTop'
import { StickyToolbar } from './extras/StickyToolbar'

export function Layout ({ children }) {
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, 'self.layout'),
      asideDisplay: objectPath.get(uiService.config, 'aside.self.display'),
      subheaderDisplay: objectPath.get(uiService.config, 'subheader.display'),
      desktopHeaderDisplay: objectPath.get(
        uiService.config,
        'header.self.fixed.desktop'
      ),
      contentCssClasses: uiService.getClasses('content', true),
      contentContainerClasses: uiService.getClasses('content_container', true),
      contentExtended: objectPath.get(uiService.config, 'content.extended')
    }
  }, [uiService])

  return layoutProps.selfLayout !== 'blank' ? (
    <>
      <HeaderMobile />
      <div className='d-flex flex-column flex-root'>
        <div className='d-flex flex-row flex-column-fluid page'>
          {layoutProps.asideDisplay && (<Aside />)}
          <div className='d-flex flex-column flex-row-fluid wrapper' id='kt_wrapper'>
            <Header />
            <div
              id='kt_content'
              className={`content p-5 p-md-6  p-sm-8 p-xs-10  ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              {layoutProps.subheaderDisplay && <SubHeader />}
              {!layoutProps.contentExtended && (
                <div className='d-flex flex-column-fluid'>
                  {/* <div className={`${layoutProps.contentContainerClasses} px-5`}> */}
                  {children}
                </div>
              )}

              {layoutProps.contentExtended && { children }}
            </div>
            {/* <Footer/> */}
          </div>
        </div>
      </div>
      <QuickUser />
      <QuickPanel />
      <ScrollTop />
      <StickyToolbar />
      <LayoutInit />
    </>
  ) : (
  // BLANK LAYOUT
    <div className='d-flex flex-column flex-root'>{children}</div>
  )
}
