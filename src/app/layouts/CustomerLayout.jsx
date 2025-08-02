import React, { lazy, Fragment, useMemo } from 'react'
import { ContentRoute } from '../../_metronic/layout'
import { Switch, Redirect } from 'react-router-dom'
import { useHtmlClassService } from '../../_metronic/layout/_core/MetronicLayout'
import objectPath from 'object-path'

import PublicHeaderAlt from '../../_metronic/layout/components/header/PublicHeaderAlt'
import PublicFooterAlt from '../../_metronic/layout/components/footer/PublicFooterAlt'

const CustomerLayout = ({ children }) => {
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
      <PublicHeaderAlt />
      <div
        id='kt_content'
        className={`content p-5 p-md-6  p-sm-8 p-xs-10  ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
      >
        {!layoutProps.contentExtended && (
          <div className='d-flex flex-column-fluid'>
            <Switch>
              <ContentRoute path='/customer/quotes/health' component={lazy(() => import('../../app/views/quotes/health'))} />
              <ContentRoute path='/customer/quotes/travel' component={lazy(() => import('../../app/views/quotes/travel'))} />
              <ContentRoute path='/customer/quotes/motor' component={lazy(() => import('../../app/views/quotes-customer/motor'))} />
              <ContentRoute path='/customer/quotes/proposal' component={lazy(() => import('../../app/views/quotes-customer/motor/proposal'))} />
              <ContentRoute path='/customer/quotes/summary' component={lazy(() => import('../../app/views/quotes-customer/motor/proposal/StepProvisionalSummary'))} />
              <ContentRoute path='/customer/profile' component={lazy(() => import('../../app/views/aml'))} />
              <ContentRoute path='/customer/quotes/travel' component={lazy(() => import('../../app/views/quotes/travel'))} />
              <Redirect from='/customer' to='/customer/quotes/motor' />
            </Switch>
          </div>
        )}
        {layoutProps.contentExtended && { children }}
      </div>
      <PublicFooterAlt />
    </>
  )
}

export default CustomerLayout
