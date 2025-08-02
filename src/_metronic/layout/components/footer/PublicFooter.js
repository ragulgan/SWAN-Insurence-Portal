import React, { Fragment, useMemo } from 'react'
import { Grid, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Icofont from 'react-icofont'
import { useHtmlClassService } from '../../../../_metronic/layout/_core/MetronicLayout'

const PublicFooter = () => {
  const uiService = useHtmlClassService()

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses('footer', true),
      footerContainerClasses: uiService.getClasses('footer_container', true)
    }
  }, [uiService])

  return (
    <>
      <div
        className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
        id='kt_footer'
      >
        <section className='footer-main'>
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
                justifyContent='center'
                alignItems='center'
                className='one'
                spacing={6}
              >
                <Grid item>
                  <h4>NEED HELP ? CALL US</h4>
                  <h2>(230) 207 35 00</h2>
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid item>
                  <h4>SEARCH</h4>
                  <form noValidate autoComplete='off'>
                    <Grid
                      container
                      direction='row'
                      justifyContent='flex-start'
                      alignItems='center'
                      spacing={0}
                    >
                      <input type='text' className='txt-search' name='' />
                      <button type='submit' className='btn-search' value='Submit'>Submit</button>
                    </Grid>
                  </form>
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid item>
                  <h4>STAY IN TOUCH</h4>
                  <ul className='f-ul social-ul'>
                    <li>
                      <span className='facebook'><Icofont icon='facebook' /></span>
                    </li>
                    <li>
                      <span className='twitter'><Icofont icon='twitter' /></span>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
        <section className='footer-next'>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={10}>
              <ul className='f-ul top-level'>
                <li><Link to=''>FAQ</Link></li>
                <li><Link to=''>Funds Performance</Link></li>
                <li><Link to=''>What type of investor are you?</Link></li>
                <li><Link to=''>Calculator: Education</Link></li>
                <li><Link to=''>Calculator: Retirement</Link></li>
                <li><Link to=''>Market Reports</Link></li>
                <li><Link to=''>Market Charting</Link></li>
              </ul>
            </Grid>
          </Grid>
        </section>
        <section className='footer-next'>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={10}>
              <ul className='f-ul mid-level'>
                <li><Link to=''>ABOUT</Link></li>
                <li><Link to=''>CORPORATE GOVERNANCE</Link></li>
                <li><Link to=''>CAREERS</Link></li>
                <li><Link to=''>CSR</Link></li>
                <li><Link to=''>FINANCIAL</Link></li>
                <li><Link to=''>NEWS</Link></li>
                <li><Link to=''>REFER A FRIEND</Link></li>
                <li><Link to=''>SWAN REWARDS</Link></li>
                <li><Link to=''>E-PROFILE STATEMENT</Link></li>
                <li><Link to=''>BECAME AN ADVISOR</Link></li>
                <li><Link to=''>TEMPS D'AIME</Link></li>
              </ul>
            </Grid>
          </Grid>
        </section>
        <section className='footer-next'>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={10}>
              <ul className='f-ul mid-level'>
                <li><Link to=''>Privacy Notice</Link></li>
                <li><Link to=''>Legal Notice</Link></li>
                <li><Link to=''>Code of Practice</Link></li>
              </ul>
            </Grid>
          </Grid>
        </section>
      </div>
    </>
  )
}

export default PublicFooter
