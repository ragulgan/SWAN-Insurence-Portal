import React, { useMemo } from 'react'
import { Card, Grid } from '@material-ui/core'
import { logo_dark } from '../../../../helpers/assets'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { useHtmlClassService } from '../../../../_metronic/layout/_core/MetronicLayout'
import Icofont from 'react-icofont'

const PublicFooterAlt = () => {
  const uiService = useHtmlClassService()

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses('footer', true),
      footerContainerClasses: uiService.getClasses('footer_container', true)
    }
  }, [uiService])
  return (
    <div className={`footer py-8 d-flex flex-lg-column ${layoutProps.footerClasses} footer-alt`} id='kt_footer'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={10}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
          >
            <Grid item md={4}>
              <ul className='ul-txt'>
                <li>
                  <img className='logo' src={toAbsoluteUrl(logo_dark)} alt='swan logo' />
                </li>
                <li>SWAN GENERAL LTD IS LICENSED BY THE FINANCIAL SERVICES COMMISSION</li>
                <li>HEAD OFFICE: SWAN CENTRE, 10 INTENDANCE ST, PORT LOUIS, MAURITIUS</li>
                <li>BUSINESS REGISTRATION NUMBER: C06000922</li>
                <li>PHONE: 207 3500</li>
              </ul>
            </Grid>
            <Grid item md={8} className='txt-right'>
              <h4>Get in touch</h4>
              <ul className='ul-socialmedia'>
                <li><Icofont icon='facebook' /></li>
                <li><Icofont icon='twitter' /></li>
                <li><Icofont icon='instagram' /></li>
                <li><Icofont icon='linkedin' /></li>
                <li><Icofont icon='youtube-play' /></li>
              </ul>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Grid item md={4}>
              <p><span><Icofont icon='copyright' /></span> 2022 SWAN Mauritius | All rights reserved</p>
            </Grid>
            <Grid item md={8} className='txt-right'>
              <ul className='ul-others'>
                <li>Cookie policy</li>
                <li>Login terms of use</li>
                <li>privacy policy</li>
                <li>disclaimer</li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default PublicFooterAlt
