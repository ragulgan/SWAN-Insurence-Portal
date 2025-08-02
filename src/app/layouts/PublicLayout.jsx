import React, { lazy, Fragment, useMemo } from 'react'
import { ContentRoute } from '../../_metronic/layout'
import { Switch, Redirect } from 'react-router-dom'
import { useHtmlClassService } from '../../_metronic/layout/_core/MetronicLayout'
import objectPath from 'object-path'

import PublicHeader from '../../_metronic/layout/components/header/PublicHeader'
import PublicFooter from '../../_metronic/layout/components/footer/PublicFooter'

const PublicLayout = ({ children }) => {
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      contentCssClasses: uiService.getClasses('content', true),
      contentContainerClasses: uiService.getClasses('content_container', true),
      contentExtended: objectPath.get(uiService.config, 'content.extended')
    }
  }, [uiService])

  return (
    <>
      <PublicHeader />
      <div
        id='kt_content'
        className={`content p-5 p-md-6  p-sm-8 p-xs-10  ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
      >
        {!layoutProps.contentExtended && (
          <div className='d-flex flex-column-fluid'>
            <Switch>
              <ContentRoute path='/public/retrieve-quotes' component={lazy(() => import('../../app/views/quotes/retrieve-quotes'))} />
              <ContentRoute path='/public/view-quote' component={lazy(() => import('../../app/views/quotes/view-quote'))} />
              <Redirect from='/public' to='/public/retrieve-quotes' />
            </Switch>
          </div>
        )}
        {layoutProps.contentExtended && { children }}
      </div>
      <PublicFooter />
    </>
  )
}

export default PublicLayout
